'use client'

import type { Klass, LexicalNode } from 'lexical'

import { $findMatchingParent } from '@lexical/utils'
import { $getSelection, $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical'

import type { LinkFields } from '../nodes/types'
import { LinkMarkdownTransformer } from '../markdownTransformer'
import { AutoLinkNode } from '../nodes/AutoLinkNode'
import { $isLinkNode, LinkNode, TOGGLE_LINK_COMMAND } from '../nodes/LinkNode'
import { AutoLinkPlugin } from './plugins/autoLink/index'
import { ClickableLinkPlugin } from './plugins/clickableLink/index'
import { FloatingLinkEditorPlugin } from './plugins/floatingLinkEditor/index'
import { TOGGLE_LINK_WITH_MODAL_COMMAND } from './plugins/floatingLinkEditor/LinkEditor/commands'
import { LinkPlugin } from './plugins/link/index'
import { ClientFeature, ToolbarGroup } from '@payloadcms/richtext-lexical'
import { ExclusiveLinkCollectionsProps } from '../server/index'
import {
  createClientFeature,
  getSelectedNode,
  toolbarFeatureButtonsGroupWithItems,
} from '@payloadcms/richtext-lexical/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuperscript } from '@fortawesome/free-solid-svg-icons'

/**
 * React component to render the FootNote icon in the toolbar.
 */
export const FootnoteIcon = () => {
  return <FontAwesomeIcon icon={faSuperscript} style={{ color: '#aaaaaa' }} />
}
export type ClientProps = {
  defaultLinkType?: string
  defaultLinkURL?: string
  disableAutoLinks?: 'creationOnly' | true
} & ExclusiveLinkCollectionsProps

let footnoteCounter = 1
const toolbarGroups: ToolbarGroup[] = [
  toolbarFeatureButtonsGroupWithItems([
    {
      ChildComponent: FootnoteIcon,
      isActive: ({ selection }) => {
        if ($isRangeSelection(selection)) {
          const selectedNode = getSelectedNode(selection)
          const linkParent = $findMatchingParent(selectedNode, $isLinkNode)
          return linkParent != null
        }
        return false
      },
      isEnabled: ({ selection }) => {
        return !!($isRangeSelection(selection) && $getSelection()?.getTextContent()?.length)
      },
      key: 'link',
      label: ({ i18n }) => {
        return i18n.t('lexical:link:label')
      },
      onSelect: ({ editor, isActive }) => {
        if (!isActive) {
          let selectedText: string | undefined
          let selectedNodes: LexicalNode[] = []
          editor.getEditorState().read(() => {
            selectedText = $getSelection()?.getTextContent()
            // We need to selected nodes here before the drawer opens, as clicking around in the drawer may change the original selection
            selectedNodes = $getSelection()?.getNodes() ?? []
          })

          if (!selectedText?.length) {
            return
          }

          const linkFields: Partial<LinkFields> = {
            doc: null,
          }

          editor.update(() => {
            const selection = $getSelection()
            if (!$isRangeSelection(selection)) return

            const insertedText = `${footnoteCounter++}`

            // Get the current selection's end
            const anchor = selection.anchor.getNode()
            const offset = selection.anchor.offset

            // Collapse selection to the end
            selection.setTextNodeRange(anchor, offset, anchor, offset)

            // Insert the text
            selection.insertText(insertedText)

            // Create a new selection only around inserted text
            const newOffset = offset + insertedText.length
            const textNode = selection.anchor.getNode()

            const newSelection = $getSelection()
            if ($isRangeSelection(newSelection)) {
              newSelection.setTextNodeRange(textNode, offset, textNode, newOffset)
            }
          })

          editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'superscript')

          editor.dispatchCommand(TOGGLE_LINK_WITH_MODAL_COMMAND, {
            fields: linkFields,
            selectedNodes,
            text: selectedText,
          })
        } else {
          // remove link
          editor.dispatchCommand(TOGGLE_LINK_COMMAND, null)
        }
      },
      order: 4,
    },
  ]),
]

export default createClientFeature<ClientProps>(({ props }) => ({
  markdownTransformers: [LinkMarkdownTransformer],
  nodes: [LinkNode, props?.disableAutoLinks === true ? null : AutoLinkNode].filter(
    Boolean,
  ) as Array<Klass<LexicalNode>>,
  plugins: [
    {
      Component: LinkPlugin,
      position: 'normal',
    },
    props?.disableAutoLinks === true || props?.disableAutoLinks === 'creationOnly'
      ? null
      : {
          Component: AutoLinkPlugin,
          position: 'normal',
        },
    {
      Component: ClickableLinkPlugin,
      position: 'normal',
    },
    {
      Component: FloatingLinkEditorPlugin,
      position: 'floatingAnchorElem',
    },
  ].filter(Boolean) as ClientFeature<ClientProps>['plugins'],
  sanitizedClientFeatureProps: props,
  toolbarFixed: {
    groups: toolbarGroups,
  },
  toolbarInline: {
    groups: toolbarGroups,
  },
}))
