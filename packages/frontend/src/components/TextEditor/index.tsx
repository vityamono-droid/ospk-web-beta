import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyleKit } from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import InvisibleCharacters from '@tiptap/extension-invisible-characters'
import Image from '@tiptap/extension-image'
import { TableKit } from '@tiptap/extension-table/kit'
import { LinkBubbleMenu, LinkBubbleMenuHandler, RichTextEditor, TableBubbleMenu, type RichTextEditorRef } from 'mui-tiptap'
import { useRef } from 'react'
import TextEditorControls from './TextEditorControls'

const TextEditor = ({ content = '', editable }: { content?: string; editable?: boolean }) => {
  const ref = useRef<RichTextEditorRef>(null)

  return (
    <RichTextEditor
      ref={ref}
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
