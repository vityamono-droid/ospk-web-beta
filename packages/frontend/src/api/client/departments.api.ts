import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { transformResponse } from '@api/transformers'

import type { ApiResponse } from '@ospk/web-models'
import type { DepartmentData } from '@ospk/web-models/departments'

const departmentsApi = createApi({
  reducerPath: 'departments',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/departments' }),
  tagTypes: ['departmentList'],
  endpoints: (builder) => ({
    listDepartments: builder.query<DepartmentData[], any, ApiResponse<DepartmentData[]>>({
      providesTags: ['departmentList'],
      query: () => '/',
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
  }),
})

export const { useListDepartmentsQuery } = departmentsApi

export default departmentsApi
