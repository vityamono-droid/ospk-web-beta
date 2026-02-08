import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'

const ClientAppBar = () => {
  return (
    <Box bgcolor={'white.main'}>
      <Container>
        <Stack p={2} direction={'row'}>
          ОСПК
        </Stack>
      </Container>
    </Box>
  )
}

export default ClientAppBar
