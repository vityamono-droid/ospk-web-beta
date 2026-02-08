import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { Outlet } from 'react-router'
import AppLogo from '@assets/ospk-logo.svg?react'

const FormLayout = () => {
  return (
    <Paper>
      <Stack p={4} spacing={2} width={500} height={600} justifyContent={'space-between'}>
        <Stack spacing={2} alignItems={'center'}>
          <AppLogo height={56} />
          <Typography variant={'h5'} fontWeight={'bold'}>ОСПК. Учетная запись</Typography>
        </Stack>
        <Outlet />
      </Stack>
    </Paper>
  )
}

export default FormLayout
