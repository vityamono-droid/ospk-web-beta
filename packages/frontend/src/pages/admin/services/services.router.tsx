import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import TabbedLayout from '../tabbed.layout'

import { useAuthContext } from '@pages/auth/auth.context'

const ServiceListPage = lazy(() => import('./serviceList'))
const CatalogListPage = lazy(() => import('./catalogList'))
const CategoryListPage = lazy(() => import('./categoryList'))
const ServicePage = lazy(() => import('./servicePage'))
const Page404 = lazy(() => import('@pages/errors/error404.page'))

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
  const { account } = useAuthContext()

  return (
    <>
      <Routes>
        {['admin', 'moder'].some((item) => account?.roles.includes(item)) ? (
          <>
            <Route element={<TabbedLayout tabs={tabs} />}>
              <Route index element={<ServiceListPage />} />
              <Route path={'catalogs'} element={<CatalogListPage />} />
              <Route path={'categories'} element={<CategoryListPage />} />
            </Route>
            <Route path={'new'} element={<ServicePage />} />
            <Route path={':id'} element={<ServicePage />} />
          </>
        ) : (
          <Route index element={<Page404 />} />
        )}
      </Routes>
      <Outlet />
    </>
  )
}

export default ServicesRouter
