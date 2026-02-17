import { createApi } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse, transformResponse } from '@api/transformers'
import authenticatedQuery from '@api/common/auth/auth.query'

import type { ApiResponse } from '@ospk/web-models'
import type { EmployeeDetails, UpsertEmployeeDetails } from '@ospk/web-models/employees'

const employeesApi = createApi({
  reducerPath: 'employees',
  baseQuery: authenticatedQuery({ baseUrl: '/api/v1/admin/departments/employees', on401: 'follow' }),
  tagTypes: ['employeeList'],
  endpoints: (builder) => ({
    listEmployees: builder.query<EmployeeDetails[], any, ApiResponse<EmployeeDetails[]>>({
      providesTags: ['employeeList'],
      query: () => `/`,
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),

    getEmployee: builder.query<UpsertEmployeeDetails, string, ApiResponse<UpsertEmployeeDetails>>({
      query: (id) => `/${id}`,
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),

    addEmployee: builder.mutation<string, FormData, ApiResponse<string>>({
      invalidatesTags: ['employeeList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Сотрудник добавлен успешно' }),
    }),

    updateEmployee: builder.mutation<string, UpdateData<FormData>, ApiResponse<string>>({
      invalidatesTags: ['employeeList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Сотрудник изменен успешно' }),
    }),

    deleteEmployee: builder.mutation<undefined, string, ApiResponse>({
      invalidatesTags: ['employeeList'],
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Сотрудник удален успешно' }),
    }),
  }),
})

export const {
  useListEmployeesQuery,
  useGetEmployeeQuery,
  useAddEmployeeMutation,
  useUpdateEmployeeMutation,
  useDeleteEmployeeMutation,
} = employeesApi

export default employeesApi
