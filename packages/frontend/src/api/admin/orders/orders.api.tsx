import authenticatedQuery from '@api/common/auth/auth.query'
import { createApi } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse, transformResponse } from '@api/transformers'

import type { ApiResponse } from '@ospk/web-models'
import type { OrderDetails, UpsertOrderDetails } from '@ospk/web-models/orders'

const ordersApi = createApi({
  reducerPath: 'orders',
  baseQuery: authenticatedQuery({ baseUrl: '/api/v1/admin/orders', on401: 'follow' }),
  tagTypes: ['orderList'],
  endpoints: (builder) => ({
    listOrders: builder.query<OrderDetails[], any, ApiResponse<OrderDetails[]>>({
      providesTags: ['orderList'],
      query: () => `/`,
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    updateOrder: builder.mutation<undefined, UpdateData<UpsertOrderDetails>, ApiResponse>({
      invalidatesTags: ['orderList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        body: data,
        method: 'PUT',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Статус изменен успешно' }),
    }),
  }),
})

export const { useListOrdersQuery, useUpdateOrderMutation } = ordersApi

export default ordersApi
