import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'

const ServiceListPage = lazy(() => import('./serviceList'))
const ServicePage = lazy(() => import('./servicePage'))

const ServicesRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<ServiceListPage />} />
        <Route path={':id'} element={<ServicePage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default ServicesRouter
