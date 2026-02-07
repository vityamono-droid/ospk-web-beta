import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'

const IndexPage = lazy(() => import('./index/index.page'))
const DetailsPage = lazy(() => import('./details/details.page'))

const ClientsRouter = () => {

  return (
    <>
      <Routes>
        <Route index element={<IndexPage />} />
        <Route path={'/:id'} element={<DetailsPage />} />
      </Routes>
      <Outlet />
    </>
  )
}

export default ClientsRouter
