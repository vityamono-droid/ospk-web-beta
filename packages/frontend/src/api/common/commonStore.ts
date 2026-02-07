import { configureStore } from '@reduxjs/toolkit/react'
import { setupListeners } from '@reduxjs/toolkit/query/react'
// reducers
import authApi from './auth/auth.api'

const commonStore = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefault) => getDefault().concat(authApi.middleware),
})

setupListeners(commonStore.dispatch)

export type RootState = ReturnType<typeof commonStore.getState>

export type AppDispatch = typeof commonStore.dispatch

export type AppStore = typeof commonStore

export default commonStore
