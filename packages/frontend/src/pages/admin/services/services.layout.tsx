import { Outlet } from 'react-router'
import NavTabs from '@components/NavTabs'

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
    <>
      <NavTabs items={tabs} />
      <Outlet />
    </>
  )
}

export default ServicesLayout
