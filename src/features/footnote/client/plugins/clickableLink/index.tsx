'use client'
import { ClickableLinkPlugin as LexicalClickableLinkPlugin } from '@lexical/react/LexicalClickableLinkPlugin'
import React from 'react'

import type { ClientProps } from '../../index'
import { PluginComponent } from '@payloadcms/richtext-lexical'

export const ClickableLinkPlugin: PluginComponent<ClientProps> = () => {
  return <LexicalClickableLinkPlugin />
}