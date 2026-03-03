import { transformResponse } from '@api/transformers'
import { createApi } from '@reduxjs/toolkit/query/react'
import authenticatedQuery from '@api/common/auth/auth.query'

import type { ApiResponse } from '@ospk/web-models'
import type { UpsertRequestData } from '@ospk/web-models/requests'

const requestsApi = createApi({
  reducerPath: 'requests',
  baseQuery: authenticatedQuery({ baseUrl: '/api/v1/requests', on401: 'follow' }),
  endpoints: (builder) => ({
    addRequest: builder.mutation<string, UpsertRequestData, ApiResponse<string>>({
      query: (data) => ({
        url: '/',
        body: data,
        method: 'POST',
      }),
      transformResponse: transformResponse({}),
    }),
    updateRequest: builder.mutation<
      string,
      UpdateData<Partial<Omit<UpsertRequestData, 'categoryId' | 'removedAt'>>>,
      ApiResponse<string>
    >({
      query: ({ id, data }) => ({
        url: `/${id}`,
        body: data,
        method: 'PUT',
      }),
    }),
  }),
})

export const { useAddRequestMutation, useUpdateRequestMutation } = requestsApi

export default requestsApi
