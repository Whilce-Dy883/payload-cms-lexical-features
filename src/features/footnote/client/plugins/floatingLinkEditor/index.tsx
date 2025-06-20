'use client'
import * as React from 'react'
import { createPortal } from 'react-dom'

import type { ClientProps } from '../../index'

import { LinkEditor } from './LinkEditor/index'
import { PluginComponentWithAnchor } from '@payloadcms/richtext-lexical'

export const FloatingLinkEditorPlugin: PluginComponentWithAnchor<ClientProps> = (props) => {
  const { anchorElem = document.body } = props

  return createPortal(<LinkEditor anchorElem={anchorElem} />, anchorElem)
}
