import type { AuthorizationCodeRequest, TokenResponse } from '@ospk/web-models/auth'
import type { ClientQueryType } from './auth.base'
import type { FetchArgs } from '@reduxjs/toolkit/query/react'
import authBaseQuery from './auth.base'

const exchangeQuery: ClientQueryType = async (_args, api, options) => {
  try {
    const query = new URLSearchParams(location.search)
    const code = query.get('code')
    const verify = localStorage.getItem(`ospk.apps_`)
    const state = localStorage.getItem(`ospk.apps__`)

    if (state !== query.get('state') || !code || !verify) {
      return {
        error: {
          status: 400,
          data: {
            message: 'Unable to verify authorization request',
            translate: 'common.errors.auth_unable_verify',
          },
        },
      }
    }

    const args = {
      url: '/token',
      method: 'POST',
      body: {
        grant_type: 'authorization_code',
        code: code,
        code_verifier: verify,
        client_name: 'webapp',
        redirect_uri: `${location.origin}/auth/callback`,
      } satisfies AuthorizationCodeRequest,
    } satisfies FetchArgs

    const result = await authBaseQuery(args, api, options)

    if (!result.error && result.data && !result.meta?.response?.redirected) {
      const { access_token, refresh_token } = result.data as TokenResponse
      localStorage.setItem(`ospk.apps.`, access_token)
      localStorage.setItem(`ospk.apps..`, refresh_token ?? '')

      location.href = localStorage.getItem(`ospk.apps___`) ?? `/`

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

export default exchangeQuery
