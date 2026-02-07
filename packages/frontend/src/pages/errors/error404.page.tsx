import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import { useNavigate } from 'react-router'

/** Страница ошибки 404 (Не Найдено) */
const Error404Page = () => {
  const navigate = useNavigate()

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Box sx={{ gap: 1, display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
        <Typography variant={'h2'} fontWeight={'bold'}>404</Typography>
        <Typography variant={'h6'}>Ничего не найдено</Typography>
        <Button onClick={() => navigate(`/`, { relative: 'route' })}>На главную</Button>
      </Box>
    </Box>
  )
}

export default Error404Page
