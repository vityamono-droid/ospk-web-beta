import { createApi } from '@reduxjs/toolkit/query/react';
import authenticatedQuery from './auth.query';
import { transformResponse } from '@api/transformers'

const accountsApi = createApi({
  reducerPath: 'accounts',
  baseQuery: authenticatedQuery({ baseUrl: '/api/v1/account', on401: 'none' }),
  tagTypes: ['account'],
  endpoints: (builder) => ({
    getAccount: builder.query({
      providesTags: ['account'],
      query: () => '/',
      transformResponse: transformResponse({}),
    }),
    verifyAccount: builder.mutation({
      invalidatesTags: ['account'],
      query: () => ({
        url: '/verify',
        method: 'POST',
      }),
    }),
  }),
})

export const { useGetAccountQuery, useVerifyAccountMutation } = accountsApi

export default accountsApi
