import { createApi } from '@reduxjs/toolkit/query/react'

import type { LoginRequest, RegisterRequest } from '@ospk/web-models/auth'

import authBaseQuery from './queries/auth.base'
import authorizeQuery from './queries/authorize.query'
import exchangeQuery from './queries/exchange.query'
import refreshQuery from './queries/refresh.query'
import revokeQuery from './queries/revoke.query'

const authApi = createApi({
  reducerPath: `auth`,
  baseQuery: authBaseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<unknown, LoginRequest>({
      query: (args) => ({
        url: '/login',
        method: 'POST',
        body: args,
        params: Object.fromEntries(new URLSearchParams(location.search)),
      }),
    }),
    register: builder.mutation<unknown, RegisterRequest>({
      query: (args) => ({
        url: '/register',
        method: 'POST',
        body: args,
        params: Object.fromEntries(new URLSearchParams(location.search)),
      }),
    }),
    authorize: builder.mutation({
      queryFn: authorizeQuery,
    }),
    token: builder.query({
      queryFn: exchangeQuery,
    }),
    refresh: builder.query({
      queryFn: refreshQuery,
    }),
    revoke: builder.mutation({
      queryFn: revokeQuery,
    }),
  }),
})

export const {
  useLoginMutation,
  useRegisterMutation,
  useAuthorizeMutation,
  useTokenQuery,
  useRevokeMutation,
} = authApi

export default authApi
