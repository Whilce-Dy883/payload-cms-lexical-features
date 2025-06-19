'use client'
import React from 'react'
import {
  $createLinkNode,
  $isLinkNode,
  LinkNode,
  createClientFeature,
  toolbarFormatGroupWithItems,
} from '@payloadcms/richtext-lexical/client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSuperscript } from '@fortawesome/free-solid-svg-icons'
import { $insertNodes, $createTextNode, $getSelection } from 'lexical'
import { $createNoteNode, NoteNode } from './FootnoteNode'

// Superscript icon for the toolbar button
const SuperscriptIcon: React.FC = () => (
  <FontAwesomeIcon icon={faSuperscript} style={{ color: '#aaaaaa' }} />
)

/**
 * Counts existing footnote link nodes within the current selection nodes
 */
function countExistingFootnotes(nodes: object[] | any[]): number {
  let total = 0
  nodes.forEach((node) => {
    const parent = node.getParent()
    if (parent) {
      total += parent.getChildren().filter((child: object | any) => $isLinkNode(child)).length
    }
  })
  return total
}

export default createClientFeature({
  // Register custom nodes
  nodes: [NoteNode, LinkNode],
  toolbarInline: {
    groups: [
      toolbarFormatGroupWithItems([
        {
          key: 'footnote',
          label: 'Footnote',
          ChildComponent: SuperscriptIcon,
          order: 6,
          /**
           * Active when a FootnoteNode is in selection
           */
          isActive: ({ selection }) => {
            return selection.getNodes().some((node) => node instanceof NoteNode)
          },
          /**
           * onSelect: Insert a new footnote link with incremented number
           */
          onSelect: ({ editor }) => {
            editor.update(() => {
              const selection = $getSelection()
              const existingCount = selection ? countExistingFootnotes(selection.getNodes()) : 0
              const footnoteNumber = existingCount + 1

              // Create text node from current selection text
              const textContent = selection ? selection.getTextContent() : ''
              const textNode = $createTextNode(textContent)

              // Create footnote node and wrap in link
              const footnoteNode = $createNoteNode(`${footnoteNumber}`)
              const linkUrl = `https://example.org/footnote/${footnoteNumber}` // Replace with actual URL logic
              const linkNode = $createLinkNode({
                fields: { title: textContent, url: linkUrl, newTab: false, linkType: 'internal' },
              })
              linkNode.append(footnoteNode)

              // Insert nodes into the editor
              $insertNodes([textNode, linkNode])
            })
          },
        },
      ]),
    ],
  },
})
