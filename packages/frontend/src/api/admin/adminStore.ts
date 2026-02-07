import { configureStore } from '@reduxjs/toolkit/react'
import { setupListeners } from '@reduxjs/toolkit/query/react'
// Auth
import newsApi from './news.api'
import clientsApi from './client.api'
// Services
import servicesApi from './services.api'
import serviceCatalogsApi from './serviceCatalogs.api'
import serviceCategoriesApi from './serviceCategories.api'
import serviceUnitsApi from './serviceUnits.api'

const adminStore = configureStore({
  reducer: {
    [clientsApi.reducerPath]: clientsApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [servicesApi.reducerPath]: servicesApi.reducer,
    [serviceCatalogsApi.reducerPath]: serviceCatalogsApi.reducer,
    [serviceCategoriesApi.reducerPath]: serviceCategoriesApi.reducer,
    [serviceUnitsApi.reducerPath]: serviceUnitsApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault()
      .concat(clientsApi.middleware)
      .concat(newsApi.middleware)
      .concat(servicesApi.middleware)
      .concat(serviceCatalogsApi.middleware)
      .concat(serviceCategoriesApi.middleware)
      .concat(serviceUnitsApi.middleware),
})

setupListeners(adminStore.dispatch)

export default adminStore
