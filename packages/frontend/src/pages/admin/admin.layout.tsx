import { Outlet } from 'react-router'
import AdminSideBar from './admin.sidebar'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { useAdminContext } from '@apps/admin.context'

import adminNav from '@apps/admin.nav'

const AdminLayout = () => {
  const { section } = useAdminContext()

  return (
    <Box sx={{ display: 'flex', boxSizing: 'border-box' }}>
      {/* SideBar */}
      <AdminSideBar />
      {/* Content */}
      <Paper
        sx={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', borderRadius: 0, overflowY: 'hidden' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Section title */}
          <Box sx={{ p: 2 }}>
            <Typography component={'h2'} variant={'h5'} fontWeight={'bold'}>
              {adminNav.find((item) => item.link == section)?.title}
            </Typography>
          </Box>
          {/* Account box */}
          <Box sx={{ p: 1.5, gap: 1, display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ width: 36, height: 36 }} />
            <Box sx={{ width: 150, display: 'flex', flexDirection: 'column' }}>
              <Typography variant={'body2'} noWrap>
                Иванова И. И.
              </Typography>
              <Typography color={'gray'} variant={'caption'} noWrap>
                ivanovaii@ospk.ru
              </Typography>
            </Box>
          </Box>
        </Box>
        {/* Page content */}
        <Box sx={{ px: 2, pb: 2, height: '100%', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          <Outlet />
        </Box>
      </Paper>
    </Box>
  )
}

export default AdminLayout
