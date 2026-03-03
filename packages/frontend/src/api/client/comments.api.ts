import { transformResponse } from '@api/transformers'
import { createApi } from '@reduxjs/toolkit/query/react'

import type { ListCommentsQuery, UpsertCommentData } from '@ospk/web-models/comments'
import authenticatedQuery from '@api/common/auth/auth.query'

const commentsApi = createApi({
  reducerPath: 'comments',
  baseQuery: authenticatedQuery({ baseUrl: '/api/v1/comments', on401: 'none' }),
  tagTypes: ['commentList'],
  endpoints: (builder) => ({
    listComment: builder.query({
      providesTags: ['commentList'],
      query: (search: ListCommentsQuery) => ({
        url: '/',
        params: search,
      }),
      transformResponse: transformResponse({ defaultValue: [] }),
    }),
    addComment: builder.mutation({
      invalidatesTags: ['commentList'],
      query: (data: UpsertCommentData) => ({
        url: '/',
        body: data,
        method: 'POST',
      }),
      transformResponse: transformResponse({ successMessage: 'Комментарий добавлен успешно' }),
    }),
  }),
})

export const { useListCommentQuery, useAddCommentMutation } = commentsApi

export default commentsApi
