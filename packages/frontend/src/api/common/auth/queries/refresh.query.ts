import type { RefreshTokenRequest, TokenResponse } from '@ospk/web-models/auth'
import type { ClientQueryType } from './auth.base'
import authBaseQuery from './auth.base'

const refreshQuery: ClientQueryType = async (_args, api, options) => {
  try {
    const token = localStorage.getItem(`ospk.apps..`)

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
      url: '/token',
      method: 'POST',
      body: {
        grant_type: 'refresh_token',
        refresh_token: token,
        client_name: localStorage.getItem('client') ?? undefined,
      } satisfies RefreshTokenRequest,
    }

    const result = await authBaseQuery(args, api, options)

    if (!result.error && result.data && !result.meta?.response?.redirected) {
          const { access_token, refresh_token } = result.data as TokenResponse
          localStorage.setItem(`ospk.apps.`, access_token)
          localStorage.setItem(`ospk.apps..`, refresh_token ?? '')

          localStorage.removeItem(`ospk.apps_`)
          localStorage.removeItem(`ospk.apps__`)
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

export default refreshQuery
