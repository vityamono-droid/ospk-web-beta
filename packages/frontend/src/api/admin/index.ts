import { configureStore } from '@reduxjs/toolkit/react'
import { setupListeners } from '@reduxjs/toolkit/query/react'
// Reducers
import * as auth from '@api/common/auth'
import * as clients from './clients'
import * as departments from './departments'
import * as articles from './articles'
import * as services from './services'
import * as carousels from './carousels'

const adminStore = configureStore({
  reducer: {
    // Auth
    [auth.authApi.reducerPath]: auth.authApi.reducer,
    [auth.accountsApi.reducerPath]: auth.accountsApi.reducer,
    // Clients
    [clients.clientsApi.reducerPath]: clients.clientsApi.reducer,
    [clients.rolesApi.reducerPath]: clients.rolesApi.reducer,
    // Departments
    [departments.employeesApi.reducerPath]: departments.employeesApi.reducer,
    [departments.departmentsApi.reducerPath]: departments.departmentsApi.reducer,
    // Articles
    [articles.articlesApi.reducerPath]: articles.articlesApi.reducer,
    [articles.catalogsApi.reducerPath]: articles.catalogsApi.reducer,
    [articles.categoriesApi.reducerPath]: articles.categoriesApi.reducer,
    // Services
    [services.servicesApi.reducerPath]: services.servicesApi.reducer,
    [services.catalogsApi.reducerPath]: services.catalogsApi.reducer,
    [services.categoriesApi.reducerPath]: services.categoriesApi.reducer,
    [services.unitsApi.reducerPath]: services.unitsApi.reducer,
    // Carousels
    [carousels.carouselsApi.reducerPath]: carousels.carouselsApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault()
      // Auth
      .concat(auth.authApi.middleware)
      .concat(auth.accountsApi.middleware)
      // Clients
      .concat(clients.clientsApi.middleware)
      .concat(clients.rolesApi.middleware)
      // Departments
      .concat(departments.employeesApi.middleware)
      .concat(departments.departmentsApi.middleware)
      // Articles
      .concat(articles.articlesApi.middleware)
      .concat(articles.catalogsApi.middleware)
      .concat(articles.categoriesApi.middleware)
      // Services
      .concat(services.servicesApi.middleware)
      .concat(services.catalogsApi.middleware)
      .concat(services.categoriesApi.middleware)
      .concat(services.unitsApi.middleware)
      // Carousels
      .concat(carousels.carouselsApi.middleware),
})

setupListeners(adminStore.dispatch)

export default adminStore
