import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse } from '@ospk/web-models'
import type { CatalogData, ServiceData } from '@ospk/web-models/services'

import { transformErrorResponse, transformResponse } from '@api/transformers'

const servicesApi = createApi({
  reducerPath: 'services',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/services' }),
  endpoints: (builder) => ({
    listCatalogs: builder.query<CatalogData[], any, ApiResponse<CatalogData[]>>({
      query: () => `/catalogs/`,
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    getCatalog: builder.query<CatalogData, string, ApiResponse<CatalogData>>({
      query: (id) => `/catalogs/${id}`,
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({}),
    }),
    getService: builder.query<ServiceData, string, ApiResponse<ServiceData>>({
      query: (id) => `/${id}`,
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),
  }),
})

export const { useListCatalogsQuery, useGetCatalogQuery, useGetServiceQuery } = servicesApi

export default servicesApi
