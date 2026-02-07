import { lazy } from 'react'
import { Route, Routes } from 'react-router'

import ClientApp from '@apps/client.app'
import AdminApp from '@apps/admin.app'

const AdminRouter = lazy(() => import('@pages/admin/admin.router'))

/** Роутер приложения. */
const AppRouter = () => {
  return (
    <Routes>
      <Route element={<ClientApp />}></Route>
      <Route element={<AdminApp />}>
        <Route path={'admin/*'} element={<AdminRouter />} />
      </Route>
    </Routes>
  )
}

export default AppRouter
