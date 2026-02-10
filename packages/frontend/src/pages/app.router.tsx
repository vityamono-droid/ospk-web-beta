import { lazy } from 'react'
import { Route, Routes } from 'react-router'

import ClientApp from '@apps/client.app'
import AdminApp from '@apps/admin.app'

const AuthRouter = lazy(() => import('@pages/auth/auth.router'))
const AdminRouter = lazy(() => import('@pages/admin/admin.router'))
const ClientRouter = lazy(() => import('@pages/client/client.router'))

/** Роутер приложения. */
const AppRouter = () => {
  return (
    <Routes>
      <Route path={'/auth/*'} element={<AuthRouter />} />
      <Route element={<AdminApp />}>
        <Route path={'admin/*'} element={<AdminRouter />} />
      </Route>
      <Route element={<ClientApp />}>
        <Route path={'/*'} element={<ClientRouter />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
