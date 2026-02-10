import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import AdminLayout from './admin.layout'
import AuthProvider, { useAuthContext } from '@pages/auth/auth.context'

const IndexPage = lazy(() => import('./index/index.page'))
const ClientsRouter = lazy(() => import('./clients/clients.router'))
const CarouselsRouter = lazy(() => import('./carousels/carousels.router'))
const ServicesRouter = lazy(() => import('./services/services.router'))
const NewsRouter = lazy(() => import('./news/news.router'))
const Page404 = lazy(() => import('@pages/errors/error404.page'))

const AdminContext = () => {
  const { account } = useAuthContext()

  return (
    <>
      <Routes>
        {account &&
          (account.roles.includes('admin') ? (
            <>
              <Route element={<AdminLayout />}>
                <Route index element={<IndexPage />} />
                <Route path={'/clients/*'} element={<ClientsRouter />} />
                <Route path={'/carousels/*'} element={<CarouselsRouter />} />
                <Route path={'/services/*'} element={<ServicesRouter />} />
                <Route path={'/news/*'} element={<NewsRouter />} />
              </Route>
              <Route index path={'*'} element={<Page404 />} />
            </>
          ) : (
            <Route index path={'*'} element={<Page404 />} />
          ))}
      </Routes>
      <Outlet />
    </>
  )
}

const AdminRouter = () => {
  return (
    <AuthProvider on401={'follow'}>
      <AdminContext />
    </AuthProvider>
  )
}

export default AdminRouter
