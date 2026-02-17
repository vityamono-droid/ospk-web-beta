import { createApi } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse, transformResponse } from '@api/transformers'
import authenticatedQuery from '@api/common/auth/auth.query'

import type { ApiResponse } from '@ospk/web-models'
import type { DepartmentDetails, UpsertDepartmentDetails } from '@ospk/web-models/departments'

const departmentsApi = createApi({
  reducerPath: 'departments',
  baseQuery: authenticatedQuery({ baseUrl: '/api/v1/admin/departments', on401: 'follow' }),
  tagTypes: ['departmentList'],
  endpoints: (builder) => ({
    listDepartments: builder.query<DepartmentDetails[], any, ApiResponse<DepartmentDetails[]>>({
      providesTags: ['departmentList'],
      query: () => `/`,
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),

    getDepartment: builder.query<UpsertDepartmentDetails, string, ApiResponse<UpsertDepartmentDetails>>({
      query: (id) => `/${id}`,
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),

    addDepartment: builder.mutation<string, UpsertDepartmentDetails, ApiResponse<string>>({
      invalidatesTags: ['departmentList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Отдел добавлен успешно' }),
    }),

    updateDepartment: builder.mutation<string, UpdateData<UpsertDepartmentDetails>, ApiResponse<string>>({
      invalidatesTags: ['departmentList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Отдел изменен успешно' }),
    }),

    deleteDepartment: builder.mutation<undefined, string, ApiResponse>({
      invalidatesTags: ['departmentList'],
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Отдел удален успешно' }),
    }),
  }),
})

export const {
  useListDepartmentsQuery,
  useGetDepartmentQuery,
  useAddDepartmentMutation,
  useUpdateDepartmentMutation,
  useDeleteDepartmentMutation,
} = departmentsApi

export default departmentsApi
