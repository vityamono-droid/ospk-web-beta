import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { useEffect, useState } from 'react'
import { useGetStaticPageQuery } from '@api/client/static.api'

const StaticContent = ({ title, file }: { title: string; file: string }) => {
  const [content, setContent] = useState('')
  const getResponse = useGetStaticPageQuery(file, {
    refetchOnMountOrArgChange: true,
  })

  useEffect(() => {
    console.log(getResponse)
    if (!getResponse.isSuccess) {
      setContent('')
      return
    }
    setContent(getResponse.data)
  }, [getResponse.status])

  return (
    <Paper>
      <Stack p={2} spacing={2}>
        <Typography variant={'h4'} fontWeight={'bold'}>
          {title}
        </Typography>
        <Divider sx={{ mx: -2 }} />
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </Stack>
    </Paper>
  )
}

export default StaticContent
