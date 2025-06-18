'use client'

import React from 'react'

// Lexical helpers for formatting and selections
import { $isRangeSelection, FORMAT_TEXT_COMMAND } from 'lexical'
import { $isTableSelection } from '@lexical/table'

// Payload CMS Lexical types and helpers
import { ToolbarGroup } from '@payloadcms/richtext-lexical'
import {
  createClientFeature as clientFeature,
  toolbarFormatGroupWithItems,
} from '@payloadcms/richtext-lexical/client'

// FontAwesome highlighter icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHighlighter } from '@fortawesome/free-solid-svg-icons'

/**
 * React component to render the highlighter icon in the toolbar.
 */
export const MarkIcon = () => {
  return <FontAwesomeIcon icon={faHighlighter} />
}

/**
 * Shared toolbar group configuration for both fixed and inline toolbars.
 */
const toolbarGroups: ToolbarGroup[] = [
  toolbarFormatGroupWithItems([
    {
      key: 'marks', // Unique key for this toolbar button
      label: 'Highlight', // Tooltip text
      ChildComponent: MarkIcon, // Icon shown in the toolbar
      isActive: ({ selection }) => {
        // Activate button when selection includes 'highlight' format
        if ($isRangeSelection(selection) || $isTableSelection(selection)) {
          return selection.hasFormat('highlight')
        }
        return false
      },
      onSelect: ({ editor }) => {
        // Toggle highlight on selected text
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'highlight')
      },
    },
  ]),
]

/**
 * Exports the mark/highlight feature as a client-side Lexical feature
 * for use in both fixed and inline toolbars.
 */
export default clientFeature({
  enableFormats: ['highlight'],
  toolbarFixed: {
    groups: toolbarGroups,
  },
  toolbarInline: {
    groups: toolbarGroups,
  },
})
