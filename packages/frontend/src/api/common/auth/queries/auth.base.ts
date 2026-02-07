import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
  type FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react'

export type BaseQueryType = BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>

export type ClientQueryType = BaseQueryFn<unknown, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>

const authBaseQuery: BaseQueryType = async (args, api, options) => {
  try {
    const query = fetchBaseQuery({ baseUrl: '/api/v1/auth' })

    const result = await query(args, api, options)
    if (!result.meta?.response) {
      return result
    }

    const { ok, status, redirected, url } = result.meta.response
    if ((ok || status == 404) && redirected) {
      location.href = url
      return {
        data: {
          error: false,
          message: 'Redirected',
        },
      }
    }

    return result
  } catch (error) {
    return {
      error: {
        status: 'CUSTOM_ERROR',
        data: error,
        error: 'Unknown error querying API',
      },
    }
  }
}

export default authBaseQuery
