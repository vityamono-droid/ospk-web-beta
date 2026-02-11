import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import AuthProvider from '@pages/auth/auth.context'
import ClientLayout from './layout/client.layout'

const NewsRouter = lazy(() => import('./news/news.router'))
const IndexPage = lazy(() => import('./indexPage'))
const ServicesRouter = lazy(() => import('./services/services.router'))
const DonorsRouter = lazy(() => import('./donors/donors.router'))
const Error501Page = lazy(() => import('../errors/error501.page'))

const ClientRouter = () => {
  return (
    <AuthProvider on401={'none'}>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route index element={<IndexPage />} />
          <Route path={'news/*'} element={<NewsRouter />} />
          <Route path={'services/*'} element={<ServicesRouter />} />
          <Route path={'donors/*'} element={<DonorsRouter />} />
          <Route path={'about/*'} element={<Error501Page />} />
          <Route path={'contacts/*'} element={<Error501Page />} />
        </Route>
        <Route index path={'*'} />
      </Routes>
      <Outlet />
    </AuthProvider>
  )
}

export default ClientRouter
