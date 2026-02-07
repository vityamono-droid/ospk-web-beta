import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'

/** Колесо загрузки асинхронно загружаемого контента */
const Loading = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <CircularProgress size={64} />
    </Box>
  )
}

export default Loading
