import { configureStore } from '@reduxjs/toolkit/react'
import { setupListeners } from '@reduxjs/toolkit/query/react'
//Clients
import clientsApi from './client.api'
// Articles
import articleApi from './article.api'
import articleCatalogsApi from './articleCatalogs.api'
import articleCategoriesApi from './articleCategories.api'
// Services
import servicesApi from './services.api'
import serviceCatalogsApi from './serviceCatalogs.api'
import serviceCategoriesApi from './serviceCategories.api'
import serviceUnitsApi from './serviceUnits.api'

const adminStore = configureStore({
  reducer: {
    // Clients
    [clientsApi.reducerPath]: clientsApi.reducer,
    // Articles
    [articleApi.reducerPath]: articleApi.reducer,
    [articleCatalogsApi.reducerPath]: articleCatalogsApi.reducer,
    [articleCategoriesApi.reducerPath]: articleCategoriesApi.reducer,
    // Services
    [servicesApi.reducerPath]: servicesApi.reducer,
    [serviceCatalogsApi.reducerPath]: serviceCatalogsApi.reducer,
    [serviceCategoriesApi.reducerPath]: serviceCategoriesApi.reducer,
    [serviceUnitsApi.reducerPath]: serviceUnitsApi.reducer,
  },
  middleware: (getDefault) =>
    getDefault()
      // Clients
      .concat(clientsApi.middleware)
      // Articles
      .concat(articleApi.middleware)
      .concat(articleCatalogsApi.middleware)
      .concat(articleCategoriesApi.middleware)
      // Services
      .concat(servicesApi.middleware)
      .concat(serviceCatalogsApi.middleware)
      .concat(serviceCategoriesApi.middleware)
      .concat(serviceUnitsApi.middleware),
})

setupListeners(adminStore.dispatch)

export default adminStore
