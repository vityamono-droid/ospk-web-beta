import NavTabs from '@components/NavTabs'
import Box from '@mui/material/Box'
import { Outlet } from 'react-router'

const tabs = [
  {
    label: 'Новости',
    value: '/admin/news',
  },
  {
    label: 'Каталоги',
    value: '/admin/news/catalogs',
  },
  {
    label: 'Категории',
    value: '/admin/news/categories',
  },
]

const NewsLayout = () => {
  return (
    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
      <NavTabs items={tabs} />
      <Outlet />
    </Box>
  )
}

export default NewsLayout
