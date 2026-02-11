import { createApi } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse, transformResponse } from '@api/transformers'
import authenticatedQuery from '@api/common/auth/auth.query'

import type { ApiResponse } from '@ospk/web-models'
import { type RoleDetails, type UpsertRoleDetails } from '@ospk/web-models/clients'

const rolesApi = createApi({
  reducerPath: 'roles',
  baseQuery: authenticatedQuery({ baseUrl: '/api/v1/admin/clients/roles', on401: 'follow' }),
  tagTypes: ['roleList'],
  endpoints: (builder) => ({
    listRoles: builder.query<RoleDetails[], any, ApiResponse<RoleDetails[]>>({
      providesTags: ['roleList'],
      query: (search) => ({
        url: `/`,
        method: 'GET',
        params: search,
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),

    getRole: builder.mutation<UpsertRoleDetails, string, ApiResponse<UpsertRoleDetails>>({
      query: (id) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),

    addRole: builder.mutation<undefined, UpsertRoleDetails, ApiResponse>({
      invalidatesTags: ['roleList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Роль добавлена успешно' }),
    }),

    updateRole: builder.mutation<undefined, UpdateData<UpsertRoleDetails>, ApiResponse>({
      invalidatesTags: ['roleList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Роль изменена успешно' }),
    }),

    deleteRole: builder.mutation<undefined, string, ApiResponse>({
      invalidatesTags: ['roleList'],
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Роль удалена успешно' }),
    }),
  }),
})

export const { useListRolesQuery, useGetRoleMutation, useAddRoleMutation, useUpdateRoleMutation, useDeleteRoleMutation } =
  rolesApi

export default rolesApi
