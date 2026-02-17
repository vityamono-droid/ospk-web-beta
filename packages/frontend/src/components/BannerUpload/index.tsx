import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import AddIcon from '@mui/icons-material/Add'
import ClearIcon from '@mui/icons-material/Clear'
import IconButton from '@mui/material/IconButton'

import { useRef, type ChangeEvent } from 'react'

interface BannerUploadProps {
  file: string | null
  error?: boolean
  onChange?: ValueCallback<File | null>
  onPreview?: ValueCallback<string | null>
}

const fileTypes = ['image/jpeg', 'image/jgp', 'image/png', 'image/webp']

const BannerUpload = ({ file, error, onChange, onPreview }: BannerUploadProps) => {
  const ref = useRef<HTMLInputElement>(null)

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.item(0)
    if (!file || !fileTypes.includes(file.type)) {
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      !!onPreview && onPreview(reader.result as string)
    }

    reader.readAsDataURL(file)
    !!onChange && onChange(file)
  }

  const handleDelete = () => {
    !!onPreview && onPreview(null)
    !!onChange && onChange(null)
  }

  return (
    <Stack
      p={1}
      width={322}
      height={222}
      position={'relative'}
      border={'3px dashed'}
      borderColor={error ? 'error.main' : '#808088'}
      borderRadius={2}>
      <input hidden ref={ref} type='file' accept={fileTypes.join()} value={''} onChange={handleChange} />
      {file ? (
        <>
          <Stack borderRadius={1.5} overflow={'hidden'}>
            <img width={'300'} height={'200'} src={file ?? undefined} />
          </Stack>
          <Stack
            bgcolor={'#e0e0ee66'}
            borderRadius={2}
            component={IconButton}
            size={'small'}
            sx={{ position: 'absolute', top: 0, right: 0, transform: 'translate(-30%, 30%)' }}
            onClick={() => handleDelete()}>
            <ClearIcon fontSize={'small'} />
          </Stack>
        </>
      ) : (
        <Button sx={{ width: 300, height: 200 }} onClick={() => ref.current?.click()}>
          <AddIcon fontSize={'large'} />
        </Button>
      )}
    </Stack>
  )
}

export default BannerUpload
