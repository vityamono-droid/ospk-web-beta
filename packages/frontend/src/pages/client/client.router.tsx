import { Outlet, Route, Routes } from 'react-router'
import ClientLayout from './client.layout'
import { lazy } from 'react'
import OAuthProvider from '@pages/auth/oauth.context'

const NewsRouter = lazy(() => import('./news/news.router'))
const AuthRouter = lazy(() => import('@pages/auth/auth.router'))
const IndexPage = lazy(() => import('./indexPage'))
const ServicesRouter = lazy(() => import('./services/services.router'))

const ClientRouter = () => {
  return (
    <OAuthProvider client='webapp'>
      <Routes>
        <Route path={'/auth/*'} element={<AuthRouter />} />
        <Route element={<ClientLayout />}>
          <Route index element={<IndexPage />} />
          <Route path={'news/*'} element={<NewsRouter />} />
          <Route path={'services/*'} element={<ServicesRouter />} />
        </Route>
        <Route index path={'*'} />
      </Routes>
      <Outlet />
    </OAuthProvider>
  )
}

export default ClientRouter
