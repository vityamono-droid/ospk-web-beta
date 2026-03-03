import authenticatedQuery from '@api/common/auth/auth.query'
import { transformErrorResponse, transformResponse } from '@api/transformers'
import type { ApiResponse } from '@ospk/web-models'
import type { CategoryDetails, RequestDetails, UpsertCategoryDetails, UpsertRequestDetails } from '@ospk/web-models/requests'
import { createApi } from '@reduxjs/toolkit/query/react'

const requestsApi = createApi({
  reducerPath: 'requests',
  baseQuery: authenticatedQuery({ baseUrl: '/api/v1/admin/requests', on401: 'follow' }),
  tagTypes: ['categoryList', 'requestList'],
  endpoints: (builder) => ({
    listCategories: builder.query<CategoryDetails[], any, ApiResponse<CategoryDetails[]>>({
      query: () => `/categories`,
      providesTags: ['categoryList'],
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    getCategory: builder.query<UpsertCategoryDetails, string, ApiResponse<UpsertCategoryDetails>>({
      query: (id) => `/categories/${id}`,
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),
    addCategory: builder.mutation<string, UpsertCategoryDetails, ApiResponse<string>>({
      query: (data) => ({
        url: `/categories`,
        body: data,
        method: 'POST',
      }),
      invalidatesTags: ['categoryList'],
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Категория добавлена успешно' }),
    }),
    updateCategory: builder.mutation<string, UpdateData<UpsertCategoryDetails>, ApiResponse<string>>({
      query: ({ id, data }) => ({
        url: `/categories/${id}`,
        body: data,
        method: 'PUT',
      }),
      invalidatesTags: ['categoryList'],
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Категория изменена успешно' }),
    }),
    deleteCategory: builder.mutation<undefined, string, ApiResponse>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['categoryList'],
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Категория удалена успешно' }),
    }),
    listRequests: builder.query<RequestDetails[], any, ApiResponse<RequestDetails[]>>({
      query: () => `/`,
      providesTags: ['requestList'],
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    updateRequest: builder.mutation<string, UpdateData<UpsertRequestDetails>, ApiResponse<string>>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        body: data,
        method: 'PUT',
      }),
      invalidatesTags: ['requestList'],
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
  }),
})

export const {
  useListCategoriesQuery,
  useGetCategoryQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useListRequestsQuery,
} = requestsApi

export default requestsApi
