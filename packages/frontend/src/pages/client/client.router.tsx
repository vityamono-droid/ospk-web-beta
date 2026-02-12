import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import AuthProvider from '@pages/auth/auth.context'
import ClientLayout from './_layout/client.layout'

const NewsRouter = lazy(() => import('./news/news.router'))
const IndexPage = lazy(() => import('./indexPage'))
const ServicesRouter = lazy(() => import('./services/services.router'))
const DonorsRouter = lazy(() => import('./donors/donors.router'))
const Page404 = lazy(() => import('@pages/errors/error404.page'))
const Page501 = lazy(() => import('../errors/error501.page'))

const ClientRouter = () => {
  return (
    <AuthProvider on401={'none'}>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route index element={<IndexPage />} />
          <Route path={'news/*'} element={<NewsRouter />} />
          <Route path={'services/*'} element={<ServicesRouter />} />
          <Route path={'donors/*'} element={<DonorsRouter />} />
          <Route path={'about/*'} element={<Page501 />} />
          <Route path={'contacts/*'} element={<Page501 />} />
        </Route>
        <Route path={'*'} element={<Page404 />} />
      </Routes>
      <Outlet />
    </AuthProvider>
  )
}

export default ClientRouter
