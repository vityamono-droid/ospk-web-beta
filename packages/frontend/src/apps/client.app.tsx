import { Outlet } from 'react-router'
import { Provider as ApiProvider } from 'react-redux'
import ClientProvider from './client.context'

import clientStore from '@api/client'

/** Клиентское приложение. */
const ClientApp = () => {
  return (
    <ApiProvider store={clientStore}>
      <ClientProvider>
        <Outlet />
      </ClientProvider>
    </ApiProvider>
  )
}

export default ClientApp
