import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useNavigate } from 'react-router'

const Error501Page = ({ backTo }: { backTo?: string }) => {
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <Typography variant={'h4'} fontWeight={'bold'}>
          В разработке
        </Typography>
        <Typography variant={'h6'}>Скоро тут что-то будет</Typography>
        <Button onClick={() => navigate(backTo ?? `/`, { relative: 'path' })}>На главную</Button>
      </Box>
    </Box>
  )
}

export default Error501Page
