import { lazy } from 'react'
import { Outlet, Route, Routes } from 'react-router'
import AdminLayout from './_layout'
import AuthProvider, { useAuthContext } from '@pages/auth/auth.context'

const IndexPage = lazy(() => import('./index/index.page'))
const ClientsRouter = lazy(() => import('./clients/clients.router'))
const DepartmentsRouter = lazy(() => import('./departmens/departments.router'))
const ServicesRouter = lazy(() => import('./services/services.router'))
const NewsRouter = lazy(() => import('./news/news.router'))
// const CarouselsRouter = lazy(() => import('./carousels/carousels.router'))
const Page404 = lazy(() => import('@pages/errors/error404.page'))
const Page501 = lazy(() => import('@pages/errors/error501.page'))

const AdminRouter = () => {
  return (
    <AuthProvider on401={'follow'}>
      <AdminRoutes />
    </AuthProvider>
  )
}

const AdminRoutes = () => {
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
                <Route path={'/orders/*'} element={<Page501 backTo='/admin' />} />
                <Route path={'/requests/*'} element={<Page501 />} />

                <Route path={'/employees/*'} element={<Page501 backTo='/admin' />} />
                <Route path={'/departments/*'} element={<DepartmentsRouter />} />
                <Route path={'/services/*'} element={<ServicesRouter />} />

                <Route path={'/news/*'} element={<NewsRouter />} />
                <Route path={'/announces/*'} element={<Page501 backTo='/admin' />} />
                <Route path={'/carousels/*'} element={<Page501 backTo='/admin' />} />
              </Route>
              <Route index path={'*'} element={<Page404 backTo='/admin' />} />
            </>
          ) : (
            <Route index path={'*'} element={<Page404 backTo='/admin' />} />
          ))}
      </Routes>
      <Outlet />
    </>
  )
}

export default AdminRouter
