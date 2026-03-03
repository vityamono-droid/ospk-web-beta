import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'

const CategoriesList = lazy(() => import('./categoryList'))

const RequestsRouter = () => {
  return (
    <>
      <Routes>
        <Route index element={<CategoriesList />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default RequestsRouter
