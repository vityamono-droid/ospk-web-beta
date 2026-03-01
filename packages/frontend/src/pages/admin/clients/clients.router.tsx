import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import TabbedLayout from '../tabbed.layout'

const ClientListPage = lazy(() => import('./clientList'))

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

// Роутер раздела "Пользователи"
const ClientsRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<TabbedLayout tabs={tabs} />}>
          <Route index element={<ClientListPage type={'CLIENT'} />} />
          <Route path={'staff'} element={<ClientListPage type={'STAFF'} />} />
        </Route>
      </Routes>
      <Outlet />
    </>
  )
}

export default ClientsRouter
