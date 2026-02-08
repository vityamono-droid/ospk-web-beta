import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import AdminLayout from './admin.layout'
import OAuthProvider from '@pages/auth/oauth.context'
import { useAppContext } from '@pages/app.context'

const AuthRouter = lazy(() => import('@pages/auth/auth.router'))
const IndexPage = lazy(() => import('./index/index.page'))
const ClientsRouter = lazy(() => import('./clients/clients.router'))
const CarouselsRouter = lazy(() => import('./carousels/carousels.router'))
const ServicesRouter = lazy(() => import('./services/services.router'))
const NewsRouter = lazy(() => import('./news/news.router'))
const Page404 = lazy(() => import('@pages/errors/error404.page'))

const AdminRouter = () => {
  const { account } = useAppContext()

  return (
    <OAuthProvider client={'webapp_admin'}>
      <Routes>
        <Route path={'/auth/*'} element={<AuthRouter />} />
        <Route element={<AdminLayout />}>
          <Route index element={<IndexPage />} />
          <Route path={'/clients/*'} element={<ClientsRouter />} />
          <Route path={'/carousels/*'} element={<CarouselsRouter />} />
          <Route path={'/services/*'} element={<ServicesRouter />} />
          <Route path={'/news/*'} element={<NewsRouter />} />
        </Route>
        <Route index path={'*'} element={<Page404 />} />
      </Routes>
      <Outlet />
    </OAuthProvider>
  )
}

export default AdminRouter
