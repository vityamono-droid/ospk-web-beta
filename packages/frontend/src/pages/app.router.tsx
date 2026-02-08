import { lazy } from 'react'
import { Route, Routes } from 'react-router'

import AppProvider from './app.context'
import ClientApp from '@apps/client.app'
import AdminApp from '@apps/admin.app'

const AdminRouter = lazy(() => import('@pages/admin/admin.router'))
const ClientRouter = lazy(() => import('@pages/client/client.router'))

/** Роутер приложения. */
const AppRouter = () => {
  return (
    <AppProvider>
      <Routes>
        <Route element={<ClientApp />}>
          <Route path={'client/*'} element={<ClientRouter />} />
        </Route>
        <Route element={<AdminApp />}>
          <Route path={'admin/*'} element={<AdminRouter />} />
        </Route>
      </Routes>
    </AppProvider>
  )
}

export default AppRouter
