import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { Outlet } from 'react-router'

const FaqLayout = () => {
  return (
    <Paper sx={{ flex: 1 }}>
      <Stack p={2} height={'100%'}>
        <Outlet />
      </Stack>
    </Paper>
  )
}

export default FaqLayout
