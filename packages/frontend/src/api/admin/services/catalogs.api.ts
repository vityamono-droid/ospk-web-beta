import { createApi } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse, transformResponse } from '@api/transformers'
import authenticatedQuery from '@api/common/auth/auth.query'

import type { ApiResponse } from '@ospk/web-models'
import type { ServiceCatalogDetails, UpsertServiceCatalogDetails } from '@ospk/web-models/services'

const serviceCatalogsApi = createApi({
  reducerPath: 'serviceCatalogs',
  baseQuery: authenticatedQuery({ baseUrl: '/api/v1/admin/services/catalogs', on401: 'follow' }),
  tagTypes: ['catalogList'],
  endpoints: (builder) => ({
    listCatalogs: builder.query<ServiceCatalogDetails[], any, ApiResponse<ServiceCatalogDetails[]>>({
      providesTags: ['catalogList'],
      query: () => ({
        url: `/`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),

    getCatalog: builder.query<UpsertServiceCatalogDetails, string, ApiResponse<UpsertServiceCatalogDetails>>({
      query: (id) => `/${id}`,
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),

    addCatalog: builder.mutation<undefined, UpsertServiceCatalogDetails, ApiResponse>({
      invalidatesTags: ['catalogList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Каталог добавлен успешно' }),
    }),

    updateCatalog: builder.mutation<undefined, UpdateData<UpsertServiceCatalogDetails>, ApiResponse>({
      invalidatesTags: ['catalogList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Каталог изменен успешно' }),
    }),

    deleteCatalog: builder.mutation<undefined, string, ApiResponse>({
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
} = serviceCatalogsApi

export default serviceCatalogsApi
