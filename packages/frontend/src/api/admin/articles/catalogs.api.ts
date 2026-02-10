import { createApi } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse, transformResponse } from '@api/transformers'
import authenticatedQuery from '@api/common/auth/auth.query'

import type { ApiResponse } from '@ospk/web-models'
import type { ArticleCatalogDetails, ListCatalogDetailsQuery, UpsertArticleCatalogDetails } from '@ospk/web-models/articles'

const articleCatalogsApi = createApi({
  reducerPath: 'articleCatalogs',
  baseQuery: authenticatedQuery({ baseUrl: '/api/v1/admin/articles/catalogs', on401: 'follow' }),
  tagTypes: ['catalogList'],
  endpoints: (builder) => ({
    listCatalogs: builder.query<ArticleCatalogDetails[], ListCatalogDetailsQuery, ApiResponse<ArticleCatalogDetails[]>>({
      providesTags: (_result, _error, arg) => (typeof arg.activeOnly === 'undefined' ? ['catalogList'] : []),
      query: (search) => ({
        url: `/`,
        method: 'GET',
        params: search,
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),

    getCatalog: builder.query<UpsertArticleCatalogDetails, string, ApiResponse<UpsertArticleCatalogDetails>>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),

    addCatalog: builder.mutation<undefined, UpsertArticleCatalogDetails, ApiResponse>({
      invalidatesTags: ['catalogList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Каталог добавлен успешно' }),
    }),

    updateCatalog: builder.mutation<undefined, UpdateData<UpsertArticleCatalogDetails>, ApiResponse>({
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
