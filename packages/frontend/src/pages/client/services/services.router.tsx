import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import ServicesLayout from './services.layout'

const ServiceListPage = lazy(() => import('./serviceList'))
const ServicePage = lazy(() => import('./servicePage'))

const ServicesRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<ServicesLayout />}>
          <Route index element={<ServiceListPage />} />
        </Route>
        <Route path={':id'} element={<ServicePage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default ServicesRouter
