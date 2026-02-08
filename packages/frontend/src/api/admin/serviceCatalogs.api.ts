import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  AddServiceCatalogRequest,
  UpdateServiceCatalogRequest,
  ServiceCatalog,
  ServiceCatalogDetails,
} from '@ospk/web-models/services'
import type { ApiResponse } from '@ospk/web-models'

import { transformErrorResponse, transformResponse } from '@api/transformers'

const serviceCatalogsApi = createApi({
  reducerPath: 'serviceCatalogs',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/admin/serviceCatalogs' }),
  tagTypes: ['catalogList'],
  endpoints: (builder) => ({
    listCatalogs: builder.query<ServiceCatalog[], any, ApiResponse<ServiceCatalog[]>>({
      providesTags: ['catalogList'],
      query: () => ({
        url: `/`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    getCatalog: builder.query<ServiceCatalogDetails, string, ApiResponse<ServiceCatalogDetails>>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),
    addCatalog: builder.mutation<undefined, AddServiceCatalogRequest, ApiResponse<undefined>>({
      invalidatesTags: ['catalogList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Каталог добавлен успешно' }),
    }),
    updateCatalog: builder.mutation<undefined, { id: string; data: UpdateServiceCatalogRequest }, ApiResponse<undefined>>({
      invalidatesTags: ['catalogList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Каталог изменен успешно' }),
    }),
    deleteCatalog: builder.mutation<undefined, string, ApiResponse<undefined>>({
      invalidatesTags: ['catalogList'],
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Каталог удален успешно' }),
    }),
  }),
})

export const {
  useListCatalogsQuery,
  useGetCatalogQuery,
  useAddCatalogMutation,
  useUpdateCatalogMutation,
  useDeleteCatalogMutation,
} = serviceCatalogsApi

export default serviceCatalogsApi
