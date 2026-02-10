import type { AuthorizeRequest } from '@ospk/web-models/auth'
import type { ClientQueryType } from './auth.base'
import type { FetchArgs } from '@reduxjs/toolkit/query/react'
import { generatePKCE } from '@utils/pkce.util'
import authBaseQuery from './auth.base'

const authorizeQuery: ClientQueryType = async (_args, api, options) => {
  try {
    const { code_challenge, code_verifier, state } = await generatePKCE()

    localStorage.setItem(`ospk.apps_`, code_verifier)
    localStorage.setItem(`ospk.apps__`, state)
    localStorage.setItem(`ospk.apps___`, `${location.pathname}${location.search}`)

    const args = {
      url: '/authorize',
      method: 'GET',
      params: {
        response_type: 'code',
        redirect_uri: `${location.origin}/auth/callback`,
        code_challenge: code_challenge,
        code_challenge_method: 'S256',
        client_name: 'webapp',
        state: state,
      } satisfies AuthorizeRequest,
    } satisfies FetchArgs

    return await authBaseQuery(args, api, options)
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

export default authorizeQuery
