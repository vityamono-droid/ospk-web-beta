import { Outlet } from 'react-router'
import ClientCarousel from '@components/ClientCarousel'
import Stack from '@mui/material/Stack'

const ServicesLayout = () => {
  return (
    <Stack spacing={2} flex={1}>
      <ClientCarousel placement={'SERVICES'} />
      <Outlet />
    </Stack>
  )
}

export default ServicesLayout
