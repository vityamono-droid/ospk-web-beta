import { configureStore } from '@reduxjs/toolkit/react'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import authApi from '@api/common/auth/auth.api'
import accountsApi from '@api/common/accounts.api'
import servicesApi from './services.api'
import articlesApi from './articles.api'
import staticApi from './static.api'

const clientStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [staticApi.reducerPath]: staticApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault()
      .concat(authApi.middleware)
      .concat(accountsApi.middleware)
      .concat(articlesApi.middleware)
      .concat(servicesApi.middleware)
      .concat(staticApi.middleware),
})

setupListeners(clientStore.dispatch)

export default clientStore
