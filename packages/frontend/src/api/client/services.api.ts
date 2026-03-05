import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse } from '@ospk/web-models'
import type { CatalogData, CatalogDataDetails, ServiceDataDetails } from '@ospk/web-models/services'

import { transformErrorResponse, transformResponse } from '@api/transformers'

const servicesApi = createApi({
  reducerPath: 'services',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/services' }),
  tagTypes: ['service'],
  endpoints: (builder) => ({
    listCatalogs: builder.query<CatalogData[], any, ApiResponse<CatalogData[]>>({
      query: () => `/catalogs/`,
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    getCatalog: builder.query<CatalogDataDetails, string, ApiResponse<CatalogDataDetails>>({
      query: (id) => `/catalogs/${id}`,
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({}),
    }),
    getService: builder.query<ServiceDataDetails, string, ApiResponse<ServiceDataDetails>>({
      providesTags: ['service'],
      query: (id) => `/${id}`,
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),
  }),
})

export const { useListCatalogsQuery, useGetCatalogQuery, useGetServiceQuery } = servicesApi

export default servicesApi
