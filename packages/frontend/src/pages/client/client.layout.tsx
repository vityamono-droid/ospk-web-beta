import { useClientContext } from '@apps/client.context'
import Container from '@mui/material/Container'
import { Outlet } from 'react-router'
import Stack from '@mui/material/Stack'
import Box from '@mui/material/Box'

const ClientLayout = () => {
  //const context = useClientContext()

  return (
    <Stack spacing={2}>
      {/* AppBar */}
      {/* Content */}
      <Box height={'100vh'} display={'flex'}>
        {/* Carousel */}
        <Container>
          <Outlet />
        </Container>
      </Box>
      {/* Footer */}
    </Stack>
  )
}

export default ClientLayout
