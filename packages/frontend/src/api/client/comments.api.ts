import { transformResponse } from '@api/transformers'
import { createApi } from '@reduxjs/toolkit/query/react'
import authenticatedQuery from '@api/common/auth/auth.query'

import type { ApiResponse } from '@ospk/web-models'
import type { ListCommentsQuery, UpsertCommentData } from '@ospk/web-models/comments'

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
    addComment: builder.mutation<undefined, UpsertCommentData, ApiResponse>({
      invalidatesTags: ['commentList'],
      query: (data) => ({
        url: '/',
        body: data,
        method: 'POST',
      }),
      transformResponse: transformResponse({ successMessage: 'Комментарий добавлен успешно' }),
    }),
    voteComment: builder.mutation<undefined, UpdateData<{ direction: 'UP_VOTE' | 'DOWN_VOTE' }>, ApiResponse>({
      invalidatesTags: ['commentList'],
      query: ({ id, data }) => ({
        url: `/${id}`,
        body: data,
        method: 'PUT',
      }),
      transformResponse: transformResponse({}),
    }),
  }),
})

export const { useListCommentQuery, useAddCommentMutation, useVoteCommentMutation } = commentsApi

export default commentsApi
