import { configureStore } from '@reduxjs/toolkit/react'
import { setupListeners } from '@reduxjs/toolkit/query/react'

const clientStore = configureStore({
  reducer: {},
  middleware: (getDefault) => getDefault(),
})

setupListeners(clientStore.dispatch)

export default clientStore
