import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
// Auth
import * as auth from './auth'

const commonStore = configureStore({
  reducer: {
    [auth.authApi.reducerPath]: auth.authApi.reducer,
    [auth.accountsApi.reducerPath]: auth.accountsApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(auth.authApi.middleware).concat(auth.accountsApi.middleware),
})

setupListeners(commonStore.dispatch)

export default commonStore
