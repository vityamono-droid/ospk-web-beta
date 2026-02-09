import { Outlet } from 'react-router'
import { Provider as ApiProvider } from 'react-redux'
import AdminProvider from './admin.context'

import adminStore from '@api/admin'

/** Приложение для сотрудников. */
const AdminApp = () => {
  return (
    <ApiProvider store={adminStore}>
      <AdminProvider>
        <Outlet />
      </AdminProvider>
    </ApiProvider>
  )
}

export default AdminApp
