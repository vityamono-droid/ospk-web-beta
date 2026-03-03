import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

import ChevronUpIcon from '@mui/icons-material/KeyboardArrowUp'
import ChevronDownIcon from '@mui/icons-material/KeyboardArrowDown'

import { useState } from 'react'

const ServiceContent = ({ content }: { content: string | null }) => {
  const [show, setShow] = useState(false)

  return (
    <>
      {content && (
        <Stack spacing={2}>
          <Stack overflow={'hidden'} height={show ? 'fit-content' : 400}>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Stack>
          <Button
            startIcon={show ? <ChevronUpIcon /> : <ChevronDownIcon />}
            sx={{ textTransform: 'none' }}
            onClick={() => setShow((state) => !state)}>
            {show ? 'Свернуть' : 'Развернуть'}
          </Button>
        </Stack>
      )}
    </>
  )
}

export default ServiceContent
