import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { ApiResponse } from '@ospk/web-models'
import type { ServiceCatalogNav, ServiceCatalogNavDetails, ServiceNav } from '@ospk/web-models/services'

import { transformErrorResponse, transformResponse } from '@api/transformers'

const servicesApi = createApi({
  reducerPath: 'services',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/services' }),
  endpoints: (builder) => ({
    listCatalogs: builder.query<ServiceCatalogNav[], any, ApiResponse<ServiceCatalogNav[]>>({
      query: () => ({
        url: `/catalogs/`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    getCatalog: builder.query<ServiceCatalogNavDetails, string, ApiResponse<ServiceCatalogNavDetails>>({
      query: (id) => ({
        url: `/catalogs/${id}`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({}),
    }),
    getService: builder.query<ServiceNav, string, ApiResponse<ServiceNav>>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),
  }),
})

export const { useListCatalogsQuery, useGetCatalogQuery, useGetServiceQuery } = servicesApi

export default servicesApi
