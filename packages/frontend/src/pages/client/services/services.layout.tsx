import Paper from '@mui/material/Paper'
import Stack from '@mui/material/Stack'
import { Outlet } from 'react-router'

const ServicesLayout = () => {
  return (
    <Paper>
      <Stack p={2} flex={1}>
        <Stack direction={'row'}>
          <Outlet />
        </Stack>
      </Stack>
    </Paper>
  )
}

export default ServicesLayout
