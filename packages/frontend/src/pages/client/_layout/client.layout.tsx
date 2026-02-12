import Container from '@mui/material/Container'
import { Outlet } from 'react-router'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'
import ClientAppBar from './client.appBar'
import ClientFooter from './client.footer'

const ClientLayout = () => {
  return (
    <Stack position={'relative'} spacing={2} height={'100vh'}>
      {/* AppBar */}
      <ClientAppBar />
      {/* Content */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <Container sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <Outlet />
        </Container>
      </Box>
      {/* Footer */}
      <ClientFooter />
    </Stack>
  )
}

export default ClientLayout
