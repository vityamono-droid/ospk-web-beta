import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import ServicesLayout from './services.layout'

const ServiceListPage = lazy(() => import('./serviceList'))
const CatalogListPage = lazy(() => import('./catalogList'))
const CategoryListPage = lazy(() => import('./categoryList'))
const ServicePage = lazy(() => import('./servicePage'))

const ServicesRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<ServicesLayout />}>
          <Route index element={<ServiceListPage />} />
          <Route path={'catalogs'} element={<CatalogListPage />} />
          <Route path={'categories'} element={<CategoryListPage />} />
        </Route>
        <Route path={'service'} element={<ServicePage />} />
        <Route path={'service/:id'} element={<ServicePage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default ServicesRouter
