import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse, transformResponse } from '@api/transformers'

import type { ApiResponse } from '@ospk/web-models'
import type { CatalogDetails, UpsertCatalogDetails } from '@ospk/web-models/services'

const serviceCatalogsApi = createApi({
  reducerPath: 'serviceCatalogs',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/admin/services/catalogs' }),
  tagTypes: ['catalogList'],
  endpoints: (builder) => ({
    listCatalogs: builder.query<CatalogDetails[], any, ApiResponse<CatalogDetails[]>>({
      providesTags: ['catalogList'],
      query: () => ({
        url: `/`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),

    getCatalog: builder.query<UpsertCatalogDetails, string, ApiResponse<UpsertCatalogDetails>>({
      query: (id) => `/${id}`,
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),

    addCatalog: builder.mutation<undefined, UpsertCatalogDetails, ApiResponse>({
      invalidatesTags: ['catalogList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Каталог добавлен успешно' }),
    }),

    updateCatalog: builder.mutation<undefined, UpdateData<UpsertCatalogDetails>, ApiResponse>({
      invalidatesTags: ['catalogList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Каталог изменен успешно' }),
    }),

    deleteCatalog: builder.mutation<undefined, string, ApiResponse>({
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
