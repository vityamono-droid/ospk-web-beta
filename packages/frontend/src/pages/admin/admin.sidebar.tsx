import Box from '@mui/material/Box'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'

import OspkIcon from '@assets/ospk-logo.svg?react'
import HelpIcon from '@mui/icons-material/HelpOutline'

import { useNavigate } from 'react-router'
import { useAdminContext } from '@apps/admin.context'
import adminNav, { type AdminNavItem } from '@apps/admin.nav'
import useMediaQuery from '@mui/material/useMediaQuery'

interface SideBarItemProps {
  item: AdminNavItem
  selected: boolean
  hideTitle: boolean
  onClick: () => void
}

const SideBarItem = ({ item, selected, hideTitle, onClick }: SideBarItemProps) => {
  return (
    <MenuItem selected={selected} onClick={onClick} sx={{ py: 1.5 }} divider={item.underline}>
      <ListItemIcon sx={{ '&.MuiListItemIcon-root': { minWidth: hideTitle ? 0 : 36 } }}>{item.icon}</ListItemIcon>
      {!hideTitle && <ListItemText>{item.title}</ListItemText>}
    </MenuItem>
  )
}

const AdminSideBar = () => {
  const navigate = useNavigate()
  const media = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const { section } = useAdminContext()

  return (
    <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', minWidth: { xs: 'auto', sm: 250 } }}>
      <Box sx={{ p: 2, gap: 1, display: 'flex', alignItems: 'center' }}>
        <OspkIcon height={24} />
        {!media && (
          <Typography component={'h1'} variant={'h5'} fontWeight={'bold'}>
            ОСПК Админ
          </Typography>
        )}
      </Box>
      {adminNav.map((item) => (
        <SideBarItem
          key={crypto.randomUUID()}
          item={item}
          selected={section == item.link}
          hideTitle={media}
          onClick={() => navigate(`/admin/${item.link}`)}
        />
      ))}

      <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column' }}>
        <SideBarItem
          key={crypto.randomUUID()}
          item={{ title: 'Помощь', icon: <HelpIcon />, link: 'help' }}
          selected={false}
          hideTitle={media}
          onClick={() => {}}
        />
      </Box>
    </Box>
  )
}

export default AdminSideBar
