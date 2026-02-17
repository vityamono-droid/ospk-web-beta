import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Paper from '@mui/material/Paper'

import { useTokenQuery } from '@api/common/auth/auth.api'

const CallbackPage = () => {
  useTokenQuery({})

  return (
    <Paper>
      <Box sx={{ width: 150, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress size={72} />
      </Box>
    </Paper>
  )
}

export default CallbackPage
