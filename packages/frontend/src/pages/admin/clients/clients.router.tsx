import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import ClientsLayout from './clients.layout'

const ClientListPage = lazy(() => import('./clientList'))

const ClientsRouter = () => {

  return (
    <>
      <Routes>
        <Route element={<ClientsLayout />}>
          <Route index element={<ClientListPage type={'CLIENT'} />} />
          <Route path={'staff'} element={<ClientListPage type={'STAFF'} />} />
        </Route>
      </Routes>
      <Outlet />
    </>
  )
}

export default ClientsRouter
