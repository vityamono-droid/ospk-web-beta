import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse, transformResponse } from '@api/transformers'

import type { ApiResponse } from '@ospk/web-models'
import type { CatalogDetails, ListCatalogDetailsQuery, UpsertCatalogDetails } from '@ospk/web-models/articles'

const articleCatalogsApi = createApi({
  reducerPath: 'articleCatalogs',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/admin/articles/catalogs' }),
  tagTypes: ['catalogList'],
  endpoints: (builder) => ({
    listCatalogs: builder.query<CatalogDetails[], ListCatalogDetailsQuery, ApiResponse<CatalogDetails[]>>({
      providesTags: (_result, _error, arg) => (typeof arg.activeOnly === 'undefined' ? ['catalogList'] : []),
      query: (search) => ({
        url: `/`,
        method: 'GET',
        params: search,
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),

    getCatalog: builder.query<UpsertCatalogDetails, string, ApiResponse<UpsertCatalogDetails>>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
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
} = articleCatalogsApi

export default articleCatalogsApi
