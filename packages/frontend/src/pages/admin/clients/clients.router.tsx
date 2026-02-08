import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import ClientsLayout from './clients.layout'

const IndexPage = lazy(() => import('./index/index.page'))
const DetailsPage = lazy(() => import('./details/details.page'))

const ClientsRouter = () => {

  return (
    <>
      <Routes>
        <Route element={<ClientsLayout />}>
          <Route index element={<IndexPage />} />
        </Route>
        <Route path={'/:id'} element={<DetailsPage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default ClientsRouter
