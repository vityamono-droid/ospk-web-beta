import type { RevokeTokenRequest } from '@ospk/web-models/auth'
import type { ClientQueryType } from './auth.base'
import type { FetchArgs } from '@reduxjs/toolkit/query/react'
import authBaseQuery from './auth.base'

const revokeQuery: ClientQueryType = async (_args, api, options) => {
  try {
    const token = localStorage.getItem(`ospk.apps.`)
    if (!token) {
      return {
        error: {
          status: 401,
          data: {
            message: 'Unauthorized',
            translate: 'common.errors.unauthorized',
          },
        },
      }
    }

    const args = {
      url: '/token/revoke',
      method: 'POST',
      body: {
        token: token,
        client_name: 'webapp',
      } satisfies RevokeTokenRequest,
    } satisfies FetchArgs

    const result = await authBaseQuery(args, api, options)

    if (!result.error && !result.meta?.response?.redirected) {
      localStorage.removeItem(`ospk.apps.`)
      localStorage.removeItem(`ospk.apps..`)

      location.href = `/`

      localStorage.removeItem(`ospk.apps___`)
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

export default revokeQuery
