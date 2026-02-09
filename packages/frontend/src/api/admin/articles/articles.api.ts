import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse, transformResponse } from '@api/transformers'

import type { ApiResponse } from '@ospk/web-models'
import type { ArticleDetails, ListArticlesQuery, UpsertArticleDetails } from '@ospk/web-models/articles'

const articlesApi = createApi({
  reducerPath: 'articles',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/admin/articles' }),
  tagTypes: ['articleList'],
  endpoints: (builder) => ({
    listArticles: builder.query<ArticleDetails[], ListArticlesQuery, ApiResponse<ArticleDetails[]>>({
      providesTags: ['articleList'],
      query: (search) => ({
        url: `/`,
        method: 'GET',
        params: search,
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    getArticle: builder.query<UpsertArticleDetails, string, ApiResponse<UpsertArticleDetails>>({
      query: (id) => `/${id}`,
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),
    addArticle: builder.mutation<undefined, UpsertArticleDetails, ApiResponse>({
      invalidatesTags: ['articleList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Статья добавлена успешно' }),
    }),
    updateArticle: builder.mutation<undefined, UpdateData<UpsertArticleDetails>, ApiResponse>({
      invalidatesTags: ['articleList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Статья изменена успешно' }),
    }),
    deleteArticle: builder.mutation<undefined, string, ApiResponse>({
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
} = articlesApi

export default articlesApi
