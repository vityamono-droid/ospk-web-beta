import { configureStore } from '@reduxjs/toolkit/react'
import { setupListeners } from '@reduxjs/toolkit/query/react'

import authApi from '@api/common/auth/auth.api'
import accountsApi from '@api/common/auth/accounts.api'
import servicesApi from './services.api'
import articlesApi from './articles.api'
import departmentsApi from './departments.api'
import staticApi from './static.api'
import carouselsApi from './carousels.api'
import commentsApi from './comments.api'
import * as requests from './requests'

const clientStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [departmentsApi.reducerPath]: departmentsApi.reducer,
    [staticApi.reducerPath]: staticApi.reducer,
    [carouselsApi.reducerPath]: carouselsApi.reducer,
    [commentsApi.reducerPath]: commentsApi.reducer,
    [requests.requestsApi.reducerPath]: requests.requestsApi.reducer,
    [requests.categoriesApi.reducerPath]: requests.categoriesApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault()
      .concat(authApi.middleware)
      .concat(accountsApi.middleware)
      .concat(articlesApi.middleware)
      .concat(servicesApi.middleware)
      .concat(departmentsApi.middleware)
      .concat(staticApi.middleware)
      .concat(carouselsApi.middleware)
      .concat(commentsApi.middleware)
      .concat(requests.requestsApi.middleware)
      .concat(requests.categoriesApi.middleware),
})

setupListeners(clientStore.dispatch)

export default clientStore
