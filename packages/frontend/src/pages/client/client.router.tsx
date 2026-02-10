import { Outlet, Route, Routes } from 'react-router'
import ClientLayout from './client.layout'
import { lazy } from 'react'
import AuthProvider from '@pages/auth/auth.context'

const NewsRouter = lazy(() => import('./news/news.router'))
const IndexPage = lazy(() => import('./indexPage'))
const ServicesRouter = lazy(() => import('./services/services.router'))

const ClientRouter = () => {
  return (
    <AuthProvider on401={'none'}>
      <Routes>
        <Route element={<ClientLayout />}>
          <Route index element={<IndexPage />} />
          <Route path={'news/*'} element={<NewsRouter />} />
          <Route path={'services/*'} element={<ServicesRouter />} />
        </Route>
        <Route index path={'*'} />
      </Routes>
      <Outlet />
    </AuthProvider>
  )
}

export default ClientRouter
