import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse, transformResponse } from '@api/transformers'

import type { ApiResponse } from '@ospk/web-models'
import type { UnitDetails, UpsertUnitDetails } from '@ospk/web-models/services'

const serviceUnitsApi = createApi({
  reducerPath: 'serviceUnits',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/admin/services/units' }),
  tagTypes: ['unitList'],
  endpoints: (builder) => ({
    listUnits: builder.query<UnitDetails[], any, ApiResponse<UnitDetails[]>>({
      providesTags: ['unitList'],
      query: () => `/`,
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),

    addUnit: builder.mutation<undefined, UpsertUnitDetails, ApiResponse>({
      invalidatesTags: ['unitList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Ед. измерения добавлена успешно' }),
    }),

    updateUnit: builder.mutation<undefined, UpdateData<UpsertUnitDetails>, ApiResponse>({
      invalidatesTags: ['unitList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Ед. измерения изменена успешно' }),
    }),

    deleteUnit: builder.mutation<undefined, string, ApiResponse>({
      invalidatesTags: ['unitList'],
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Ед. измерения удалена успешно' }),
    }),
  }),
})

export const { useListUnitsQuery, useAddUnitMutation, useUpdateUnitMutation, useDeleteUnitMutation } = serviceUnitsApi

export default serviceUnitsApi
