import { useAuthorizeMutation, useRevokeMutation } from '@api/common/auth/auth.api'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import { useAuthContext } from '@pages/auth/auth.context'
import { useEffect, useRef, useState } from 'react'
import SettingsIcon from '@mui/icons-material/Settings'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import RedirectIcon from '@mui/icons-material/ChevronRight'
import { useLocation, useNavigate } from 'react-router'
import formatPhone from '@utils/formatPhone'
import shortFullname from '@utils/shortFullname'

const AccountBox = () => {
  const ref = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const { account } = useAuthContext()

  const [open, setOpen] = useState(false)
  const [app, setApp] = useState('/')

  const [authorize] = useAuthorizeMutation()
  const [revoke] = useRevokeMutation()

  useEffect(() => {
    setApp(location.pathname.startsWith('/admin') ? '/admin' : '/')
  }, [location.key])

  return (
    <>
      {account ? (
        <>
          <Box
            ref={ref}
            sx={{ p: 1.5, gap: 1, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => setOpen(true)}>
            <Avatar sx={{ width: 36, height: 36, border: '1px solid gray' }} src={account.avatar ?? undefined} />
            <Box sx={{ width: 150, display: 'flex', flexDirection: 'column' }}>
              <Typography variant={'body2'} noWrap>
                {shortFullname(account.firstName, account.lastName, account.patronymic)}
              </Typography>
              <Typography color={'gray'} variant={'caption'} noWrap>
                {account.email}
              </Typography>
            </Box>
          </Box>
          <Menu
            anchorEl={ref.current}
            open={open}
            onClose={() => setOpen((state) => !state)}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
            <Box sx={{ p: 2, pb: 0, gap: 2, display: 'flex', flexDirection: 'column' }}>
              <Box sx={{ gap: 1, display: 'flex', alignItems: 'center' }}>
                <Avatar variant={'rounded'} sx={{ width: 48, height: 48 }} src={account.avatar ?? undefined} />
                <Box sx={{ gap: 0, display: 'flex', flexDirection: 'column' }}>
                  <Typography>{formatPhone(account.phone)}</Typography>
                  <Typography color={'gray'}>{account.email}</Typography>
                </Box>
              </Box>
              <Divider sx={{ mx: -2 }} />
            </Box>
            {account.roles.length > 0 && (
              <MenuItem onClick={() => navigate(app == '/' ? '/admin' : '/')}>
                <ListItemIcon>
                  <RedirectIcon />
                </ListItemIcon>
                <ListItemText>Перейти {app == '/' ? 'в админ' : 'на клиент'}</ListItemText>
              </MenuItem>
            )}
            <MenuItem onClick={() => navigate('/account')}>
              <ListItemIcon>
                <SettingsIcon />
              </ListItemIcon>
              <ListItemText>Перейти в настройки</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => revoke({})}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText>Выйти из аккаунта</ListItemText>
            </MenuItem>
          </Menu>
        </>
      ) : (
        <Button ref={ref} startIcon={<LoginIcon />} onClick={() => authorize({})}>
          Войти
        </Button>
      )}
    </>
  )
}

export default AccountBox
