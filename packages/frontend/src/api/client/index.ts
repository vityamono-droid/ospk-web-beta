import { configureStore } from '@reduxjs/toolkit/react'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import authApi from '@api/common/auth/auth.api'
import accountsApi from '@api/common/accounts.api'
import servicesApi from './services.api'
import articlesApi from './articles.api'

const clientStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault()
      .concat(authApi.middleware)
      .concat(accountsApi.middleware)
      .concat(articlesApi.middleware)
      .concat(servicesApi.middleware),
})

setupListeners(clientStore.dispatch)

export default clientStore
