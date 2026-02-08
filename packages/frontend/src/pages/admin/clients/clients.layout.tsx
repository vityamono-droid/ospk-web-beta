import { Outlet } from 'react-router'
import NavTabs from '@components/NavTabs'

const tabs = [
  {
    label: 'Клиенты',
    value: '/admin/clients',
  },
  {
    label: 'Сотрудники',
    value: '/admin/clients/staff',
  },
]

const ClientsLayout = () => {
  return (
    <>
      <NavTabs items={tabs} />
      <Outlet />
    </>
  )
}

export default ClientsLayout
