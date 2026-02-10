import { createApi } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse, transformResponse } from '@api/transformers'
import authenticatedQuery from '@api/common/auth/auth.query'

import type { ApiResponse } from '@ospk/web-models'
import type { ServiceCategoryDetails, UpsertServiceCategoryDetails } from '@ospk/web-models/services'

const serviceCategoriesApi = createApi({
  reducerPath: 'serviceCategories',
  baseQuery: authenticatedQuery({ baseUrl: '/api/v1/admin/services/categories', on401: 'follow' }),
  tagTypes: ['categoryList'],
  endpoints: (builder) => ({
    listCategories: builder.query<ServiceCategoryDetails[], any, ApiResponse<ServiceCategoryDetails[]>>({
      providesTags: ['categoryList'],
      query: () => ({
        url: `/`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),

    getCategory: builder.query<UpsertServiceCategoryDetails, string, ApiResponse<UpsertServiceCategoryDetails>>({
      query: (id) => `/${id}`,
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),

    addCategory: builder.mutation<undefined, UpsertServiceCategoryDetails, ApiResponse>({
      invalidatesTags: ['categoryList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Категория добавлена успешно' }),
    }),

    updateCategory: builder.mutation<undefined, UpdateData<UpsertServiceCategoryDetails>, ApiResponse>({
      invalidatesTags: ['categoryList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Категория изменена успешно' }),
    }),

    deleteCategory: builder.mutation<undefined, string, ApiResponse>({
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
} = serviceCategoriesApi

export default serviceCategoriesApi
