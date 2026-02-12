import type { RichTextEditorRef } from 'mui-tiptap'
import { useRef } from 'react'

const useTextEditor = () => {
  const ref = useRef<RichTextEditorRef>(null)

  return {
    ref,
    api: {
      getText: () => ref.current?.editor?.getText(),
      getHTML: () => ref.current?.editor?.getHTML(),
    }
  }
}

export default useTextEditor
