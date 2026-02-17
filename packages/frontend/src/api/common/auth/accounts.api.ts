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
  }),
})

export const { useGetAccountQuery } = accountsApi

export default accountsApi
