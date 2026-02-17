import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import AppLogo from '@assets/ospk-logo.svg?react'
import { Link as RouterLink, useNavigate } from 'react-router'
import Link from '@mui/material/Link'
import Menu from '@mui/material/Menu'
import { useRef, useState } from 'react'
import MenuItem from '@mui/material/MenuItem'
import ListItemText from '@mui/material/ListItemText'
import { useClientContext } from '@apps/client.context'
import AccountBox from '@components/AccountBox'

const ClientAppBar = () => {
  const navigate = useNavigate()

  return (
    <Box bgcolor={'white.main'} position={'sticky'} top={0} left={0} right={0} zIndex={999}>
      <Container>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Link component={RouterLink} to={'/'} underline={'none'} color={'textPrimary'}>
            <Stack p={2} direction={'row'} spacing={1} alignItems={'center'}>
              <AppLogo height={36} />
              <Stack component={'h1'} sx={{ display: { xs: 'none', lg: 'flex' } }}>
                <Typography noWrap fontWeight={'bold'}>
                  Челябинская областная
                </Typography>
                <Typography noWrap variant={'caption'} fontWeight={'bold'} lineHeight={1}>
                  Станция переливания крови
                </Typography>
              </Stack>
            </Stack>
          </Link>
          <Stack direction={'row'} sx={{ display: { xs: 'none', md: 'flex' } }}>
            <ServicesNavItem />
            <NewsNavItem />
            <Button variant={'nav-link'} sx={{ whiteSpace: 'noWrap' }} onClick={() => navigate('/donors')}>
              Донорам
            </Button>
            <AboutNavItem />
            <ContactsNavItem />
          </Stack>
          <Stack direction={'row'} alignItems={'center'}>
            <AccountBox />
          </Stack>
        </Stack>
      </Container>
    </Box>
  )
}

const ServicesNavItem = () => {
  const navigate = useNavigate()
  const { services } = useClientContext()
  const ref = useRef(null)

  const [open, setOpen] = useState(false)

  const handleClick = (id?: string) => {
    services.onChange(id)
    navigate('/services')
    setOpen(false)
  }

  return (
    <>
      <Button ref={ref} variant={'nav-link'} onClick={() => setOpen(true)}>
        Услуги
      </Button>
      <Menu anchorEl={ref.current} open={open} onClose={() => setOpen(false)}>
        {services.catalogs.map((item) => (
          <MenuItem key={item.id} onClick={() => handleClick(item.id)}>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

const AboutNavItem = () => {
  const navigate = useNavigate()
  const ref = useRef(null)

  const [open, setOpen] = useState(false)

  const handleClick = (to: string) => {
    navigate(to)
    setOpen(false)
  }

  return (
    <>
      <Button ref={ref} variant={'nav-link'} onClick={() => setOpen(true)}>
        О станции
      </Button>
      <Menu anchorEl={ref.current} open={open} onClose={() => setOpen(false)}>
        <MenuItem onClick={() => handleClick('/employees')}>
          <ListItemText>Сотрудники</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClick('/legal')}>
          <ListItemText>Правовые документы</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

const ContactsNavItem = () => {
  const navigate = useNavigate()
  const ref = useRef(null)

  const [open, setOpen] = useState(false)

  const handleClick = (to: string) => {
    navigate(to)
    setOpen(false)
  }

  return (
    <>
      <Button ref={ref} variant={'nav-link'} onClick={() => setOpen(true)}>
        Контакты
      </Button>
      <Menu anchorEl={ref.current} open={open} onClose={() => setOpen(false)}>
        <MenuItem onClick={() => handleClick('/faq')}>
          <ListItemText>FAQ</ListItemText>
        </MenuItem>
        <MenuItem onClick={() => handleClick('/contacts')}>
          <ListItemText>Контакты</ListItemText>
        </MenuItem>
      </Menu>
    </>
  )
}

const NewsNavItem = () => {
  const navigate = useNavigate()
  const { articles } = useClientContext()
  const ref = useRef(null)

  const [open, setOpen] = useState(false)

  const handleClick = (id?: string) => {
    articles.onChange(id)
    navigate('/news')
    setOpen(false)
  }

  return (
    <>
      <Button ref={ref} variant={'nav-link'} onClick={() => setOpen(true)}>
        Новости
      </Button>
      <Menu anchorEl={ref.current} open={open} onClose={() => setOpen(false)}>
        <MenuItem onClick={() => handleClick()}>
          <ListItemText>Все новости</ListItemText>
        </MenuItem>
        {articles.catalogs.map((item) => (
          <MenuItem key={item.id} onClick={() => handleClick(item.id)}>
            <ListItemText>{item.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default ClientAppBar
