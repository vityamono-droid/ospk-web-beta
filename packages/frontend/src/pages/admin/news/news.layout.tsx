import { Outlet } from 'react-router'
import NavTabs from '@components/NavTabs'

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
    <>
      <NavTabs tabs={tabs} />
      <Outlet />
    </>
  )
}

export default NewsLayout
