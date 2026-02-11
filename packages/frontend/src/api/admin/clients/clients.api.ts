import { createApi } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse, transformResponse } from '@api/transformers'
import authenticatedQuery from '@api/common/auth/auth.query'

import type { ApiResponse } from '@ospk/web-models'
import { type UpsertClientDetails, type ClientDetails, type ListClientDetailsQuery } from '@ospk/web-models/clients'

const clientsApi = createApi({
  reducerPath: 'clients',
  baseQuery: authenticatedQuery({ baseUrl: '/api/v1/admin/clients', on401: 'follow' }),
  tagTypes: ['clientList'],
  endpoints: (builder) => ({
    listClients: builder.query<ClientDetails[], ListClientDetailsQuery, ApiResponse<ClientDetails[]>>({
      providesTags: ['clientList'],
      query: (search) => ({
        url: `/`,
        method: 'GET',
        params: search,
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),

    getClient: builder.query<UpsertClientDetails, string, ApiResponse<UpsertClientDetails>>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),

    addClient: builder.mutation<undefined, FormData, ApiResponse>({
      invalidatesTags: ['clientList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Пользователь добавлен успешно' }),
    }),

    updateClient: builder.mutation<undefined, UpdateData<FormData>, ApiResponse>({
      invalidatesTags: ['clientList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Пользователь изменен успешно' }),
    }),

    deleteClient: builder.mutation<undefined, string, ApiResponse>({
      invalidatesTags: ['clientList'],
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Пользователь удален успешно' }),
    }),
  }),
})

export const {
  useListClientsQuery,
  useGetClientQuery,
  useAddClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApi

export default clientsApi
