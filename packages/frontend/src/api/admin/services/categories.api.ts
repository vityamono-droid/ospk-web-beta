import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse, transformResponse } from '@api/transformers'

import type { ApiResponse } from '@ospk/web-models'
import type { CategoryDetails, UpsertCategoryDetails } from '@ospk/web-models/services'

const serviceCategoriesApi = createApi({
  reducerPath: 'serviceCategories',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/admin/services/categories' }),
  tagTypes: ['categoryList'],
  endpoints: (builder) => ({
    listCategories: builder.query<CategoryDetails[], any, ApiResponse<CategoryDetails[]>>({
      providesTags: ['categoryList'],
      query: () => ({
        url: `/`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),

    getCategory: builder.query<UpsertCategoryDetails, string, ApiResponse<UpsertCategoryDetails>>({
      query: (id) => `/${id}`,
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),

    addCategory: builder.mutation<undefined, UpsertCategoryDetails, ApiResponse>({
      invalidatesTags: ['categoryList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Категория добавлена успешно' }),
    }),

    updateCategory: builder.mutation<undefined, UpdateData<UpsertCategoryDetails>, ApiResponse>({
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
