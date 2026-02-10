import { configureStore } from '@reduxjs/toolkit/react'
import { setupListeners } from '@reduxjs/toolkit/query/react'
// Auth
import authApi from '@api/common/auth/auth.api'
import accountsApi from '@api/common/accounts.api'
//Clients
import clientsApi from './client.api'
// Articles
import * as articles from './articles'
import * as services from './services'

const adminStore = configureStore({
  reducer: {
    // Auth
    [authApi.reducerPath]: authApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
    // Clients
    [clientsApi.reducerPath]: clientsApi.reducer,
    // Articles
    [articles.articlesApi.reducerPath]: articles.articlesApi.reducer,
    [articles.catalogsApi.reducerPath]: articles.catalogsApi.reducer,
    [articles.categoriesApi.reducerPath]: articles.categoriesApi.reducer,
    // Services
    [services.servicesApi.reducerPath]: services.servicesApi.reducer,
    [services.catalogsApi.reducerPath]: services.catalogsApi.reducer,
    [services.categoriesApi.reducerPath]: services.categoriesApi.reducer,
    [services.unitsApi.reducerPath]: services.unitsApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault()
      // Auth
      .concat(authApi.middleware)
      .concat(accountsApi.middleware)
      // Clients
      .concat(clientsApi.middleware)
      // Articles
      .concat(articles.articlesApi.middleware)
      .concat(articles.catalogsApi.middleware)
      .concat(articles.categoriesApi.middleware)
      // Services
      .concat(services.servicesApi.middleware)
      .concat(services.catalogsApi.middleware)
      .concat(services.categoriesApi.middleware)
      .concat(services.unitsApi.middleware),
})

setupListeners(adminStore.dispatch)

export default adminStore
