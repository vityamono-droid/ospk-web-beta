import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  AddServiceRequest,
  ListServicesRequest,
  UpdateServiceListRequest,
  UpdateServiceRequest,
  Service,
  ServiceDetails,
} from '@ospk/web-models/services'
import type { ApiResponse } from '@ospk/web-models'

import { transformErrorResponse, transformResponse } from '@api/transformers'

const servicesApi = createApi({
  reducerPath: 'services',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/admin/services' }),
  tagTypes: ['serviceList'],
  endpoints: (builder) => ({
    listServices: builder.query<Service[], ListServicesRequest, ApiResponse<Service[]>>({
      providesTags: ['serviceList'],
      query: (search) => ({
        url: `/`,
        method: 'GET',
        params: search,
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    getService: builder.query<ServiceDetails, string, ApiResponse<ServiceDetails>>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),
    addService: builder.mutation<undefined, AddServiceRequest, ApiResponse<undefined>>({
      invalidatesTags: ['serviceList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Услуга добавлена успешно' }),
    }),
    updateService: builder.mutation<undefined, { id: string; data: UpdateServiceRequest }, ApiResponse<undefined>>({
      invalidatesTags: ['serviceList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Услуга изменена успешно' }),
    }),
    updateServiceList: builder.mutation<undefined, UpdateServiceListRequest, ApiResponse<undefined>>({
      invalidatesTags: ['serviceList'],
      query: (data) => ({
        url: `/`,
        method: 'PATCH',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Услуги изменены успешно' }),
    }),
    deleteService: builder.mutation<undefined, string, ApiResponse<undefined>>({
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
