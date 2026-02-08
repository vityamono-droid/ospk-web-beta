import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { AddUnitRequest, UpdateUnitRequest, UnitDetails } from '@ospk/web-models/services'
import type { ApiResponse } from '@ospk/web-models'

import { transformErrorResponse, transformResponse } from '@api/transformers'

const serviceUnitsApi = createApi({
  reducerPath: 'serviceUnits',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/admin/serviceUnits' }),
  tagTypes: ['unitList'],
  endpoints: (builder) => ({
    listUnits: builder.query<UnitDetails[], any, ApiResponse<UnitDetails[]>>({
      providesTags: ['unitList'],
      query: () => ({
        url: `/`,
        method: 'GET',
      }),
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    addUnit: builder.mutation<undefined, AddUnitRequest, ApiResponse<undefined>>({
      invalidatesTags: ['unitList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Ед. измерения добавлена успешно' }),
    }),
    updateUnit: builder.mutation<undefined, { id: string; data: UpdateUnitRequest }, ApiResponse<undefined>>({
      invalidatesTags: ['unitList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PATCH',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Ед. измерения изменена успешно' }),
    }),
    deleteUnit: builder.mutation<undefined, string, ApiResponse<undefined>>({
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
