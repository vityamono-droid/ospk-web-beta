import { createApi } from '@reduxjs/toolkit/query/react';
import authenticatedQuery from './auth/auth.query';

const accountsApi = createApi({
  reducerPath: 'accounts',
  baseQuery: authenticatedQuery({ baseUrl: '/api/v1/account', on401: 'follow'}),
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: () => '/',
    })
  })
})

export const { useGetAccountQuery } = accountsApi

export default accountsApi
