import { configureStore } from '@reduxjs/toolkit/react'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import servicesApi from './services.api'

const clientStore = configureStore({
  reducer: {
    [servicesApi.reducerPath]: servicesApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(servicesApi.middleware),
})

setupListeners(clientStore.dispatch)

export default clientStore
