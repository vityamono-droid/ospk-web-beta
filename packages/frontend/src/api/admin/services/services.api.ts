import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse, transformResponse } from '@api/transformers'

import type { ApiResponse } from '@ospk/web-models'
import type { ListServiceDetailsQuery, ServiceDetails, ServiceDetailsAction, UpsertServiceDetails } from '@ospk/web-models/services'

const servicesApi = createApi({
  reducerPath: 'services',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/admin/services' }),
  tagTypes: ['serviceList'],
  endpoints: (builder) => ({
    listServices: builder.query<ServiceDetails[], ListServiceDetailsQuery, ApiResponse<ServiceDetails[]>>({
      providesTags: ['serviceList'],
      query: (search) => ({
        url: `/`,
        method: 'GET',
        params: search,
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),

    getService: builder.query<UpsertServiceDetails, string, ApiResponse<UpsertServiceDetails>>({
      query: (id) => `/${id}`,
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),

    addService: builder.mutation<undefined, UpsertServiceDetails, ApiResponse>({
      invalidatesTags: ['serviceList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Услуга добавлена успешно' }),
    }),

    updateService: builder.mutation<undefined, UpdateData<UpsertServiceDetails>, ApiResponse>({
      invalidatesTags: ['serviceList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Услуга изменена успешно' }),
    }),

    updateServiceList: builder.mutation<undefined, ServiceDetailsAction, ApiResponse>({
      invalidatesTags: ['serviceList'],
      query: (data) => ({
        url: `/`,
        method: 'PATCH',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Услуги изменены успешно' }),
    }),

    deleteService: builder.mutation<undefined, string, ApiResponse>({
      invalidatesTags: ['serviceList'],
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Услуга удалена успешно' }),
    }),
  }),
})

export const {
  useListServicesQuery,
  useGetServiceQuery,
  useAddServiceMutation,
  useUpdateServiceMutation,
  useUpdateServiceListMutation,
  useDeleteServiceMutation,
} = servicesApi

export default servicesApi
