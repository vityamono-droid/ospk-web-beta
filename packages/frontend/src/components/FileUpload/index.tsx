import Box from '@mui/material/Box'
import FileIcon from '@mui/icons-material/FileCopy'
import AddIcon from '@mui/icons-material/AttachFile'
import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import Tooltip from '@mui/material/Tooltip'
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Close'
import Button from '@mui/material/Button'

interface FileUploadProps {
  value?: File[]
  multiple?: boolean
  maxLength?: number
  fileTypes?: string[]
  onChange?: (value: File | File[]) => void
}

const FileUpload = ({ value, multiple, maxLength, fileTypes, onChange }: FileUploadProps) => {
  const ref = useRef<HTMLInputElement | null>(null)
  const [files, setFiles] = useState<File[]>(value ?? [])

  useEffect(() => {
  }, [files])

  const handleAdd = ({ target }: ChangeEvent<HTMLInputElement>) => {
    if (!target.files) {
      return
    }

    if (multiple) {
      const toAdd = []
      for (let i = 0; i < target.files?.length; i++) {
        if (maxLength && maxLength > 0 && files.length + toAdd.length >= maxLength) {
          return
        }

        const file = target.files.item(i)
        file && toAdd.push(file)
      }

      if (toAdd.length != 0) {
        setFiles([...files, ...toAdd])
        !!onChange && onChange(toAdd)
      }
    } else {
      const file = target.files.item(0)
      file && setFiles([file])
      file && !!onChange && onChange(file)
    }
  }

  const handleRemove = (index: number) => {
    setFiles(state => {
      const newItems = state.slice()
      newItems.splice(index, 1)
      return newItems
    })
  }

  return (
    <Box sx={{ p: 1, border: '3px dashed gray', borderRadius: 2, overflowX: 'hidden' }}>
      <Box sx={{ gap: 1, display: 'flex', overflowX: 'auto', flexDirection: 'row-reverse' }}>
        <input ref={ref} type={'file'} accept={fileTypes?.join()} multiple={multiple} hidden onChange={handleAdd} />
        {files.length != 0 && multiple && (
          <Box sx={{ bgcolor: '#D9D9D9', borderRadius: 1 }} onClick={() => ref.current?.click()}>
            <Box sx={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AddIcon color={'action'} />
            </Box>
          </Box>
        )}
        {files.map((item, index) => (
          <Tooltip title={item.name}>
            <Box sx={{ bgcolor: '#D9D9D9', borderRadius: 1 }}>
              <Box
                sx={{
                  width: 64,
                  height: 64,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                }}>
                <IconButton
                  size={'small'}
                  sx={{ p: 0.2, position: 'absolute', top: 2, right: 2 }}
                  onClick={() => handleRemove(index)}>
                  <RemoveIcon sx={{ fontSize: 18 }} />
                </IconButton>
                <FileIcon color={'action'} />
              </Box>
            </Box>
          </Tooltip>
        ))}
        {files.length == 0 && (
          <Button fullWidth endIcon={<AddIcon />} sx={{ height: 64, color: 'gray' }} onClick={() => ref.current?.click()}>
            Добавить изображение
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default FileUpload
