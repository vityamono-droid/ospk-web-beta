import { createApi } from '@reduxjs/toolkit/query/react'
import { transformErrorResponse, transformResponse } from '@api/transformers'
import authenticatedQuery from '@api/common/auth/auth.query'

import type { ApiResponse } from '@ospk/web-models'
import type { CarouselDetails, UpsertCarouselDetails } from '@ospk/web-models/carousels'

const carouselsApi = createApi({
  reducerPath: 'carousels',
  baseQuery: authenticatedQuery({ baseUrl: '/api/v1/admin/carousels', on401: 'follow' }),
  tagTypes: ['carouselList'],
  endpoints: (builder) => ({
    listCarousels: builder.query<CarouselDetails[], any, ApiResponse<CarouselDetails[]>>({
      providesTags: ['carouselList'],
      query: () => `/`,
      transformErrorResponse: transformErrorResponse([]),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),

    getCarousel: builder.query<UpsertCarouselDetails, string, ApiResponse<UpsertCarouselDetails>>({
      query: (id) => `/${id}`,
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({}),
    }),

    addCarousel: builder.mutation<string, FormData, ApiResponse<string>>({
      invalidatesTags: ['carouselList'],
      query: (data) => ({
        url: `/`,
        method: 'POST',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Карусель добавлена успешно' }),
    }),

    updateCarousel: builder.mutation<string, UpdateData<FormData>, ApiResponse<string>>({
      invalidatesTags: ['carouselList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Карусель изменена успешно' }),
    }),

    deleteCarousel: builder.mutation<undefined, string, ApiResponse>({
      invalidatesTags: ['carouselList'],
      query: (id) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      transformErrorResponse: transformErrorResponse(),
      transformResponse: transformResponse({ successMessage: 'Карусель удалена успешно' }),
    }),
  }),
})

export const {
  useListCarouselsQuery,
  useGetCarouselQuery,
  useAddCarouselMutation,
  useUpdateCarouselMutation,
  useDeleteCarouselMutation,
} = carouselsApi

export default carouselsApi
