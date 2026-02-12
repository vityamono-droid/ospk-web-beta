import { Link as RouterLink } from 'react-router'
import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import HelpModal from './help.modal'
import Link from '@mui/material/Link'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import MenuItem from '@mui/material/MenuItem'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'

import OspkIcon from '@assets/ospk-logo.svg?react'
import HelpIcon from '@mui/icons-material/HelpOutline'
import BuildIcon from '@mui/icons-material/Build'

import { useNavigate } from 'react-router'
import { useAdminContext } from '@apps/admin.context'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'

import adminNav, { type AdminNavItem } from '@apps/admin.nav'

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
      <Collapse in={!hideTitle} orientation={'horizontal'} timeout={200}>
        <ListItemText>{item.title}</ListItemText>
      </Collapse>
      {item.preview && !hideTitle && (
        <Tooltip arrow title={'Раздел в разработке'}>
          <BuildIcon color={'disabled'} sx={{ ml: 'auto', fontSize: 16 }} />
        </Tooltip>
      )}
    </MenuItem>
  )
}

const AdminSideBar = () => {
  const navigate = useNavigate()
  const media = useMediaQuery((theme) => theme.breakpoints.down('sm'))
  const { section } = useAdminContext()

  const [openModal, setOpenModal] = useState(false)

  return (
    <>
      <Box sx={{ height: '100vh', display: 'flex', flexDirection: 'column', minWidth: { xs: 'auto', sm: 250 } }}>
        <Link component={RouterLink} to={'/admin'} underline={'none'} color={'black'}>
          <Box sx={{ p: 2, gap: 1, display: 'flex', alignItems: 'center' }}>
            <OspkIcon height={24} />
            <Collapse in={!media} orientation={'horizontal'} timeout={200}>
              <Typography noWrap component={'h1'} variant={'h5'} fontWeight={'bold'}>
                ОСПК Админ
              </Typography>
            </Collapse>
          </Box>
        </Link>
        {adminNav.map((item) => (
          <SideBarItem
            key={item.link}
            item={item}
            selected={section == item.link}
            hideTitle={media}
            onClick={() => navigate(`/admin/${item.link}`)}
          />
        ))}

        <Box sx={{ mt: 'auto', display: 'flex', flexDirection: 'column' }}>
          <SideBarItem
            key={'help'}
            item={{ title: 'Помощь', icon: <HelpIcon />, link: 'help' }}
            selected={false}
            hideTitle={media}
            onClick={() => setOpenModal(true)}
          />
        </Box>
      </Box>
      {!!openModal && <HelpModal open={openModal} onClose={() => setOpenModal(false)} />}
    </>
  )
}

export default AdminSideBar
