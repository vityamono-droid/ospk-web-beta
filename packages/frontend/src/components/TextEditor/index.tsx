import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyleKit } from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import InvisibleCharacters from '@tiptap/extension-invisible-characters'
import Image from '@tiptap/extension-image'
import { TableKit } from '@tiptap/extension-table/kit'
import { LinkBubbleMenu, LinkBubbleMenuHandler, RichTextEditor, TableBubbleMenu, type RichTextEditorRef } from 'mui-tiptap'
import { useEffect, useRef } from 'react'
import TextEditorControls from './TextEditorControls'

interface TextEditorProps {
  content?: string
  editable?: boolean
  onChange?: ValueCallback<string>
}

const TextEditor = ({ content = '', editable, onChange }: TextEditorProps) => {
  const ref = useRef<RichTextEditorRef>(null)

  useEffect(() => {
    ref.current?.editor?.commands.setContent(content)
  }, [content])

  const handleChange = (value: string) => {
    !!onChange && onChange(value)
  }

  return (
    <RichTextEditor
      ref={ref}
      onUpdate={({ editor }) => handleChange(editor.getHTML())}
      content={content}
      editable={editable}
      extensions={[
        StarterKit,
        Highlight,
        InvisibleCharacters,
        Image,
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
