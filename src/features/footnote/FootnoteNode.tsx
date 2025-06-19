import { DecoratorNode, SerializedLexicalNode, $applyNodeReplacement, LexicalNode } from 'lexical'
import * as React from 'react'

// Custom serialized type for FootnoteNode
interface SerializedNoteNode extends SerializedLexicalNode {
  content: string
}

// DecoratorNode for rendering a footnote <sup> tag
export class NoteNode extends DecoratorNode<React.JSX.Element> {
  __content: string

  // Node type identifier
  static getType(): string {
    return 'footnote'
  }

  // Clone existing node
  static clone(node: NoteNode): NoteNode {
    return new NoteNode(node.__content, node.__key)
  }

  constructor(content: string, key?: string) {
    super(key)
    this.__content = content
  }

  // Getter for footnote content
  getContent(): string {
    return this.__content
  }

  // Setter with writable copy for immutability
  setContent(newContent: string): void {
    const writable = this.getWritable()
    writable.__content = newContent
  }

  // Serialize node to JSON
  exportJSON(): SerializedNoteNode {
    return {
      ...super.exportJSON(),
      type: 'footnote',
      version: 1,
      content: this.getContent(),
    }
  }

  // Restore node from serialized state
  static importJSON(serializedNode: SerializedNoteNode): NoteNode {
    return new NoteNode(serializedNode.content)
  }

  // Create DOM placeholder (not used for rendering)
  createDOM(): HTMLElement {
    return document.createElement('span')
  }

  // Always recreate on updates (never reuse DOM)
  updateDOM(): boolean {
    return false
  }

  // JSX rendering of the footnote node
  decorate(): React.JSX.Element {
    return <sup>{this.__content}</sup>
  }
}

// Factory method to create and register a NoteNode
export function $createNoteNode(text = 'note'): NoteNode {
  return $applyNodeReplacement(new NoteNode(text))
}

// Type guard to check if node is a NoteNode
export function $isNoteNode(node: LexicalNode | null | undefined): node is NoteNode {
  return node instanceof NoteNode
}
