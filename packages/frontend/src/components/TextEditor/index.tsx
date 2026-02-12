import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyleKit } from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import InvisibleCharacters from '@tiptap/extension-invisible-characters'
import { TableKit } from '@tiptap/extension-table/kit'
import { LinkBubbleMenu, LinkBubbleMenuHandler, RichTextEditor, TableBubbleMenu, type RichTextEditorRef } from 'mui-tiptap'
import { useEffect, type RefObject } from 'react'
import TextEditorControls from './TextEditorControls'

interface TextEditorProps {
  ref: RefObject<RichTextEditorRef | null>
  content?: string
  editable?: boolean
}

const TextEditor = ({ ref, content, editable }: TextEditorProps) => {
  useEffect(() => {
    if (!content) {
      return
    }

    ref.current?.editor?.commands.setContent(content)
  }, [content])

  return (
    <RichTextEditor
      ref={ref}
      editable={editable}
      extensions={[
        StarterKit,
        Highlight,
        InvisibleCharacters,
        TableKit,
        LinkBubbleMenuHandler,
        TextAlign.configure({
          types: ['heading', 'paragraph'],
          alignments: ['left', 'right', 'center', 'justify'],
          defaultAlignment: 'left',
        }),
        TextStyleKit,
      ]}
      renderControls={TextEditorControls}
      children={() => (
        <>
          <TableBubbleMenu />
          <LinkBubbleMenu />
        </>
      )}
      sx={{ flex: 1 }}
    />
  )
}

export default TextEditor
