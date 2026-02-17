
import GosuslugiLogo from '@assets/gosuslugi-logo.svg?react'
import Button from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

const GosuslugiButton = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <Paper elevation={0} sx={{ bgcolor: '#38bafe' }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
        <Stack p={2} width={'100%'} spacing={1} alignItems={'center'} justifyContent={'space-between'}>
          <Typography color={'white'} variant={'h5'}>
            Недовольны работой больницы?
          </Typography>
          <Typography color={'white'} variant={'h6'}>
            Решим проблему вместе!
          </Typography>
          <Stack direction={'row'} spacing={1}>
            <Button size={'large'} color={'info'} variant={'contained'} sx={{ textTransform: 'none' }}>
              <Typography color={'white'} variant={'h6'}>
                Написать о проблеме
              </Typography>
            </Button>
          </Stack>
        </Stack>
        <Stack p={2} width={'100%'} bgcolor={'white.main'} alignItems={'center'} justifyContent={'center'}>
          <Stack direction={'row'} spacing={2}>
            <GosuslugiLogo height={24} />
          </Stack>
          <Typography variant={'h5'}>
            Проще, чем кажется
          </Typography>
          <Typography>gosuslugi.ru</Typography>
        </Stack>
      </Stack>
    </Paper>
  )
}

export default GosuslugiButton
