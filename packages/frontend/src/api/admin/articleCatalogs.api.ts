import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ArticleCatalog, ListArticlesCatalogQuery, UpsertArticleCatalog } from '@ospk/web-models/articles'
import type { ApiResponse } from '@ospk/web-models'

import { transformErrorResponse, transformResponse } from '@api/transformers'

const articleCatalogsApi = createApi({
  reducerPath: 'articleCatalogs',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/admin/articleCatalogs' }),
  tagTypes: ['catalogList'],
  endpoints: (builder) => ({
    listCatalogs: builder.query<ArticleCatalog[], ListArticlesCatalogQuery, ApiResponse<ArticleCatalog[]>>({
      providesTags: (_result, _error, arg) =>
        typeof arg.activeOnly === 'undefined' ? ['catalogList'] : [],
      query: (search) => ({
        url: `/`,
        method: 'GET',
        params: search,
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),

    getCatalog: builder.query<UpsertArticleCatalog, string, ApiResponse<UpsertArticleCatalog>>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),

    addCatalog: builder.mutation<undefined, UpsertArticleCatalog, ApiResponse<undefined>>({
      invalidatesTags: ['catalogList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Каталог добавлен успешно' }),
    }),

    updateCatalog: builder.mutation<undefined, UpdateData<UpsertArticleCatalog>, ApiResponse<undefined>>({
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
