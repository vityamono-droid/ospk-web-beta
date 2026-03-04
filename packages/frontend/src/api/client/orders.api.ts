import authenticatedQuery from '@api/common/auth/auth.query'
import { createApi } from '@reduxjs/toolkit/query/react'
import { transformResponse } from '@api/transformers'

import type { ApiResponse } from '@ospk/web-models'
import type { OrderData, UpsertOrderData } from '@ospk/web-models/orders'

const ordersApi = createApi({
  reducerPath: 'orders',
  baseQuery: authenticatedQuery({ baseUrl: '/api/v1/orders', on401: 'follow' }),
  tagTypes: ['orderList'],
  endpoints: (builder) => ({
    listOrders: builder.query<OrderData[], any, ApiResponse<OrderData[]>>({
      providesTags: ['orderList'],
      query: () => `/`,
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    addOrder: builder.mutation<undefined, UpsertOrderData, ApiResponse>({
      invalidatesTags: ['orderList'],
      query: (data) => ({
        url: `/`,
        body: data,
        method: 'POST',
      }),
      transformResponse: transformResponse({}),
    }),
    updateOrders: builder.mutation<undefined, string, ApiResponse>({
      invalidatesTags: ['orderList'],
      query: (id) => ({
        url: `/${id}`,
        method: 'PUT',
      }),
      transformResponse: transformResponse({}),
    }),
  }),
})

export const { useListOrdersQuery, useAddOrderMutation, useUpdateOrdersMutation } = ordersApi

export default ordersApi
