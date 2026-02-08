import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse } from '@ospk/web-models'
import type { Article, ListArticlesQuery, UpsertArticle } from '@ospk/web-models/articles'

import { transformErrorResponse, transformResponse } from '@api/transformers'

const articleApi = createApi({
  reducerPath: 'articles',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/admin/articles' }),
  tagTypes: ['articleList'],
  endpoints: (builder) => ({
    listArticles: builder.query<Article[], ListArticlesQuery, ApiResponse<Article[]>>({
      providesTags: ['articleList'],
      query: (search) => ({
        url: `/`,
        method: 'GET',
        params: search,
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    getArticle: builder.query<UpsertArticle, string, ApiResponse<UpsertArticle>>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),
    addArticle: builder.mutation<undefined, UpsertArticle, ApiResponse<undefined>>({
      invalidatesTags: ['articleList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Статья добавлена успешно' }),
    }),
    updateArticle: builder.mutation<undefined, UpdateData<UpsertArticle>, ApiResponse<undefined>>({
      invalidatesTags: ['articleList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Статья изменена успешно' }),
    }),
    deleteArticle: builder.mutation<undefined, string, ApiResponse<undefined>>({
      invalidatesTags: ['articleList'],
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Статья удалена успешно' }),
    }),
  }),
})

export const {
  useListArticlesQuery,
  useGetArticleQuery,
  useAddArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,
} = articleApi

export default articleApi
