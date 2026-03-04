import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import TabbedLayout from '../tabbed.layout'

const ServiceListPage = lazy(() => import('./serviceList'))
const CatalogListPage = lazy(() => import('./catalogList'))
const CategoryListPage = lazy(() => import('./categoryList'))
const ServicePage = lazy(() => import('./servicePage'))

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

/** /admin/services */
const ServicesRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<TabbedLayout tabs={tabs} />}>
          <Route index element={<ServiceListPage />} />
          <Route path={'catalogs'} element={<CatalogListPage />} />
          <Route path={'categories'} element={<CategoryListPage />} />
        </Route>
        <Route path={'new'} element={<ServicePage />} />
        <Route path={':id'} element={<ServicePage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default ServicesRouter
