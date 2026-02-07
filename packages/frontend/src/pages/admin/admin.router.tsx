import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import AdminLayout from './admin.layout'

const IndexPage = lazy(() => import('./index/index.page'))
const ClientsRouter = lazy(() => import('./clients/clients.router'))
const CarouselsRouter = lazy(() => import('./carousels/carousels.router'))
const ServicesRouter = lazy(() => import('./services/services.router'))
const NewsRouter = lazy(() => import('./news/news.router'))

const AdminRouter = () => {
  return (
    <>
      <Routes>
        <Route element={<AdminLayout />}>
          <Route index element={<IndexPage />} />
          <Route path={'/clients/*'} element={<ClientsRouter />} />
          <Route path={'/carousels/*'} element={<CarouselsRouter />} />
          <Route path={'/services/*'} element={<ServicesRouter />} />
          <Route path={'/news/*'} element={<NewsRouter />} />
          <Route index path={'*'} />
        </Route>
      </Routes>
      <Outlet />
    </>
  )
}

export default AdminRouter
