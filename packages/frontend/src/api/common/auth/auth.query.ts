import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { BaseQueryType } from './queries/auth.base'
import refreshQuery from './queries/refresh.query'
import revokeQuery from './queries/revoke.query'
import authorizeQuery from './queries/authorize.query'

interface AuthenticatedQueryParams {
  baseUrl: string
  on401: 'follow' | 'none'
}

const authenticatedQuery =
  ({ baseUrl, on401 }: AuthenticatedQueryParams): BaseQueryType =>
  async (args, api, options) => {
    const client = localStorage.getItem('client')
    const baseQuery = fetchBaseQuery({
      baseUrl: baseUrl,
      prepareHeaders: (headers) => {
        const token = localStorage.getItem(`${client}`)
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }

        return headers
      },
    })

    let result = await baseQuery(args, api, options)
    if (result.error?.status === 401) {
      const refreshResult = await refreshQuery({}, api, options)
      if (!refreshResult.error) {
        result = await baseQuery(args, api, options)
      } else {
        await revokeQuery({}, api, options)

        on401 === 'follow' && (await authorizeQuery({}, api, options))
      }
    }

    return result
  }

export default authenticatedQuery
