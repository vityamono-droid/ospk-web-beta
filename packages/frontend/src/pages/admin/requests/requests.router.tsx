import { Outlet, Route, Routes } from 'react-router'
import TabbedLayout from '../tabbed.layout'
import { lazy } from 'react'

const RequestList = lazy(() => import('./requestList'))
const CategoriesList = lazy(() => import('./categoryList'))

const tabs = [
  {
    label: 'Обращения',
    value: '/admin/requests',
  },
  {
    label: 'Категории',
    value: '/admin/requests/categories',
  },
]

const RequestsRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<TabbedLayout tabs={tabs} />}>
          <Route index element={<RequestList />} />
          <Route path={'/categories'} element={<CategoriesList />} />
        </Route>
      </Routes>
      <Outlet />
    </>
  )
}

export default RequestsRouter
