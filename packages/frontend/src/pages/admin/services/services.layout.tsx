import NavTabs from '@components/NavTabs'
import Box from '@mui/material/Box'
import { Outlet } from 'react-router'

const tabs = [
  {
    label: 'Услуги',
    value: '/admin/services',
  },
  {
    label: 'Каталоги',
    value: '/admin/services/catalogs',
  },
  {
    label: 'Категории',
    value: '/admin/services/categories',
  },
]

const ServicesLayout = () => {
  return (
    <Box sx={{ gap: 0.5, flex: 1, display: 'flex', flexDirection: 'column' }}>
      <NavTabs items={tabs} />
      <Outlet />
    </Box>
  )
}

export default ServicesLayout
