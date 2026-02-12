import { cloneElement } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import { useAuthContext } from '@pages/auth/auth.context'
import { useNavigate } from 'react-router'

import adminNav, { type AdminNavItem } from '@apps/admin.nav'
import shortFullname from '@utils/shortFullname'

/** Главная страница панели администрирования */
const IndexPage = () => {
  const { account } = useAuthContext()

  return (
    <>
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant={'h5'} fontWeight={'bold'}>
          Добрый день, {account ? shortFullname(account.firstName, account.lastName, account.patronymic) : 'пользователь'}
        </Typography>
      </Box>
      <Grid container spacing={2}>
        {adminNav.map((item) => (
          <NavItem key={item.link} item={item} />
        ))}
      </Grid>
    </>
  )
}

const NavItem = ({ item }: { item: AdminNavItem }) => {
  const navigate = useNavigate()

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }}>
      <Paper elevation={2} sx={{ aspectRatio: { xs: 'unset', sm: 1, lg: 'unset' } }}>
        <Box sx={{ p: 2, gap: 1, height: '100%', display: 'flex', flexDirection: { xs: 'row', sm: 'column', lg: 'row' } }}>
          <Box sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box
              sx={{
                p: 2.5,
                bgcolor: '#b0b0bb',
                width: 'fit-content',
                aspectRatio: 1,
                borderRadius: 12,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {cloneElement(item.icon, { color: 'white', sx: { fontSize: 48 } })}
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: { xs: 'flex-start', sm: 'center', lg: 'flex-start' },
              justifyContent: 'space-between',
            }}>
            <Typography variant={'h5'} textAlign={'center'}>
              {item.title}
            </Typography>
            <Button onClick={() => navigate(item.link)}>Перейти</Button>
          </Box>
        </Box>
      </Paper>
    </Grid>
  )
}

export default IndexPage
