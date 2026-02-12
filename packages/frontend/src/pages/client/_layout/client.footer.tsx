import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

const ClientFooter = () => {
  return (
    <Stack bgcolor={'#2e2e2f'} color={'white.main'}>
      <Container>
        <Stack p={2}>
          <Typography variant={'caption'}>© 2026 ГБУЗ "ЧОСПК"</Typography>
        </Stack>
      </Container>
    </Stack>
  )
}

export default ClientFooter
