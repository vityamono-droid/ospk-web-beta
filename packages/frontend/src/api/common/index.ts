import { configureStore } from '@reduxjs/toolkit/react'
import { setupListeners } from '@reduxjs/toolkit/query/react'
// reducers
import authApi from './auth/auth.api'
import accountsApi from './accounts.api'

const commonStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [accountsApi.reducerPath]: accountsApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(authApi.middleware).concat(accountsApi.middleware),
})

setupListeners(commonStore.dispatch)

export default commonStore
