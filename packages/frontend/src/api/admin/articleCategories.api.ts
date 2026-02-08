import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ArticleCategory, ListArticleCategory, UpsertArticleCategory } from '@ospk/web-models/articles'
import type { ApiResponse } from '@ospk/web-models'

import { transformErrorResponse, transformResponse } from '@api/transformers'

const articleCategoriesApi = createApi({
  reducerPath: 'articleCategories',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/admin/articleCategories' }),
  tagTypes: ['categoryList'],
  endpoints: (builder) => ({
    listCategories: builder.query<ArticleCategory[], ListArticleCategory, ApiResponse<ArticleCategory[]>>({
      providesTags: (_result, _error, arg) =>
        typeof arg.activeOnly === 'undefined' && typeof arg.catalogId === 'undefined' ? ['categoryList'] : [],
      query: (search) => ({
        url: `/`,
        method: 'GET',
        params: search,
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    getCategory: builder.query<UpsertArticleCategory, string, ApiResponse<UpsertArticleCategory>>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),
    addCategory: builder.mutation<undefined, UpsertArticleCategory, ApiResponse<undefined>>({
      invalidatesTags: ['categoryList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Категория добавлена успешно' }),
    }),
    updateCategory: builder.mutation<undefined, UpdateData<UpsertArticleCategory>, ApiResponse<undefined>>({
      invalidatesTags: ['categoryList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Категория изменена успешно' }),
    }),
    deleteCategory: builder.mutation<undefined, string, ApiResponse<undefined>>({
      invalidatesTags: ['categoryList'],
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Категория удалена успешно' }),
    }),
  }),
})

export const {
  useListCategoriesQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = articleCategoriesApi

export default articleCategoriesApi
