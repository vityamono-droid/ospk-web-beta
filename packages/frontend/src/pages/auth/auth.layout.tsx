import Box from '@mui/material/Box'
import { Outlet } from 'react-router'

const AuthLayout = () => {
  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Outlet />
      </Box>
    </Box>
  )
}

export default AuthLayout
