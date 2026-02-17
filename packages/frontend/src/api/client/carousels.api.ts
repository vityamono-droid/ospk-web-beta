import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { transformResponse } from '@api/transformers'

import type { ApiResponse } from '@ospk/web-models'
import type { CarouselData } from '@ospk/web-models/carousels'

const carouselsApi = createApi({
  reducerPath: 'carousels',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/carousels' }),
  tagTypes: ['carouselList'],
  endpoints: (builder) => ({
    listCarousels: builder.query<CarouselData[], any, ApiResponse<CarouselData[]>>({
      providesTags: ['carouselList'],
      query: () => '/',
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
  }),
})

export const { useListCarouselsQuery } = carouselsApi

export default carouselsApi
