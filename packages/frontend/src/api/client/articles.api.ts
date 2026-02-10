import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse } from '@ospk/web-models'
import {
  type ArticleData,
  type ArticleItem,
  type CatalogData,
  type CatalogItem,
  type ListListArticlesItemsQuery,
} from '@ospk/web-models/articles'
import { transformResponse } from '@api/transformers'

const articlesApi = createApi({
  reducerPath: 'articles',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/articles' }),
  endpoints: (builder) => ({
    listArticles: builder.query<ArticleItem[], ListListArticlesItemsQuery, ApiResponse<ArticleItem[]>>({
      query: (search) => ({
        url: '/',
        params: search,
      }),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),

    getArticle: builder.query<ArticleData, string, ApiResponse<ArticleData>>({
      query: (id) => `/${id}`,
      transformResponse: transformResponse({}),
    }),

    listCatalogs: builder.query<CatalogItem[], any, ApiResponse<CatalogItem[]>>({
      query: () => `/catalogs`,
      transformResponse: transformResponse({ defaultValue: [] }),
    }),

    getCatalog: builder.query<CatalogData, string, ApiResponse<CatalogData>>({
      query: (id) => `/catalogs/${id}`,
      transformResponse: transformResponse({}),
    }),
  }),
})

export const { useGetArticleQuery, useGetCatalogQuery, useListArticlesQuery, useListCatalogsQuery } = articlesApi

export default articlesApi
