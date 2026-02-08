import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {
  AddServiceCategoryRequest,
  UpdateServiceCategoryRequest,
  ServiceCategory,
  ServiceCategoryDetails,
} from '@ospk/web-models/services'
import type { ApiResponse } from '@ospk/web-models'

import { transformErrorResponse, transformResponse } from '@api/transformers'

const serviceCategoriesApi = createApi({
  reducerPath: 'serviceCategories',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/admin/serviceCategories' }),
  tagTypes: ['categoryList'],
  endpoints: (builder) => ({
    listCategories: builder.query<ServiceCategory[], any, ApiResponse<ServiceCategory[]>>({
      providesTags: ['categoryList'],
      query: () => ({
        url: `/`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    getCategory: builder.query<ServiceCategoryDetails, string, ApiResponse<ServiceCategoryDetails>>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),
    addCategory: builder.mutation<undefined, AddServiceCategoryRequest, ApiResponse<undefined>>({
      invalidatesTags: ['categoryList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Категория добавлена успешно' }),
    }),
    updateCategory: builder.mutation<undefined, { id: string; data: UpdateServiceCategoryRequest }, ApiResponse<undefined>>({
      invalidatesTags: ['categoryList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Категория изменена успешно' }),
    }),
    deleteCategory: builder.mutation<undefined, string, ApiResponse<undefined>>({
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
