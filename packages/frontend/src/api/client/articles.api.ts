import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse } from '@ospk/web-models'
import {
  type ArticleNavDetails,
  type ArticleCatalogNav,
  type ArticleCatalogNavDetails,
  type ArticleNav,
} from '@ospk/web-models/articles'

const articlesApi = createApi({
  reducerPath: 'articles',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/articles' }),
  endpoints: (builder) => ({
    listArticles: builder.query<ArticleNav[], any, ApiResponse<ArticleNav[]>>({
      query: () => ({
        url: '/',
      }),
    }),
    listCatalogs: builder.query<ArticleCatalogNav[], string, ApiResponse<ArticleCatalogNav[]>>({
      query: (id) => ({
        url: `/catalogs/${id}`,
      }),
    }),
    getArticles: builder.query<ArticleCatalogNavDetails, string, ApiResponse<ArticleCatalogNavDetails>>({
      query: (id) => ({
        url: `/${id}`,
      }),
    }),
    getCatalogs: builder.query<ArticleNavDetails, string, ArticleCatalogNavDetails>({
      query: (id) => ({
        url: `/catalogs/${id}`,
      }),
    }),
  }),
})

export const { useGetArticlesQuery, useGetCatalogsQuery, useListArticlesQuery, useListCatalogsQuery } = articlesApi

export default articlesApi
