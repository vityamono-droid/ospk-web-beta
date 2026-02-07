import { lazy } from 'react'
import { Provider as ApiProvider } from 'react-redux'

import clientStore from '@api/clientStore'

const ClientRouter = lazy(() => import('@pages/client/client.router'))

/** Клиентское приложение. */
const ClientApp = () => {
  return (
    <ApiProvider store={clientStore}>
      <ClientRouter />
    </ApiProvider>
  )
}

export default ClientApp
