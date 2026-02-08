import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'

const ServiceListPage = lazy(() => import('./serviceList'))

const ServicesRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<ServiceListPage />} />
        <Route />
      </Routes>
      <Outlet />
    </>
  )
}

export default ServicesRouter
