import { transformResponse } from '@api/transformers'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import type { ApiResponse } from '@ospk/web-models'
import type { CategoryData, RequestData, RequestDataShort } from '@ospk/web-models/requests'

const categoriesApi = createApi({
  reducerPath: 'requestCategories',
  baseQuery: fetchBaseQuery({ baseUrl: '/api/v1/requests' }),
  endpoints: (builder) => ({
    listCategories: builder.query<CategoryData[], any, ApiResponse<CategoryData[]>>({
      query: () => '/categories',
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    getCategory: builder.query<RequestDataShort[], string, ApiResponse<RequestDataShort[]>>({
      query: (id: string) => `/categories/${id}`,
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    getRequest: builder.query<RequestData, string, ApiResponse<RequestData>>({
      query: (id: string) => `/${id}`,
      transformResponse: transformResponse({}),
    }),
  }),
})

export const { useListCategoriesQuery, useGetCategoryQuery, useGetRequestQuery } = categoriesApi

export default categoriesApi
