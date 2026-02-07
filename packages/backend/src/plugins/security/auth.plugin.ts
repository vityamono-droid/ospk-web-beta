import { RequestHandler } from 'express'
import { AuthorizationServer } from '@jmondi/oauth2-server'

import ClientRepository from '@repositories/client.repository'
import TokenRepository from '@repositories/token.repository'
import ScopeRepository from '@repositories/scope.repository'
import UserRepository from '@repositories/user.repository'
import CodeRepository from '@repositories/code.repository'

import useLogger from '@plugins/logging/logger.plugin'
import config from '@config'

const logger = useLogger('auth')

const authServer = new AuthorizationServer(
  new ClientRepository(),
  new TokenRepository(),
  new ScopeRepository(),
  config.secrets.cookie_secret,
  {
    tokenCID: 'name',
    issuer: config.auth.issuer,
    requiresS256: true,
    requiresPKCE: true,
    authenticateIntrospect: false,
    logger: logger,
  }
)

authServer.enableGrantType('client_credentials')
authServer.enableGrantType('refresh_token')
authServer.enableGrantType({
  grant: 'authorization_code',
  userRepository: new UserRepository(),
  authCodeRepository: new CodeRepository(),
})

const useAuth: RequestHandler = (_req, res, next) => {
  res.locals.auth = authServer

  next()
}

export default useAuth
