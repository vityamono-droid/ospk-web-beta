import { RequestHandler } from 'express'
import type { AuthorizeRequest, IntrospectTokenRequest, RevokeTokenRequest, TokenRequest } from '@ospk/web-models/auth'
import { ApiResponse } from '@ospk/web-models'
import queryString from 'query-string'
import { handleExpressResponse } from '@jmondi/oauth2-server/express'
import ApiError from '@models/ApiError'

export const authorizeHandler: RequestHandler<any, ApiResponse, any, AuthorizeRequest> = async (req, res, next) => {
  try {
    res.locals.logger.info('Handling incoming authorize request...')
    const authRequest = await res.locals.auth.validateAuthorizationRequest(req)

    if (req.query.client_name) {
      delete req.query.client_id
    }

    if (!req.session.userId) {
      res.redirect(`/auth/login?${queryString.stringify(req.query)}`)
      return
    }

    const user = await res.locals.prisma.user.findUnique({
      where: { id: req.session.userId, removedAt: null },
    })
    if (!user) {
      throw ApiError.invalidCredentials()
    }

    req.session.user = user
    authRequest.user = req.session.user
    authRequest.isAuthorizationApproved = authRequest.client.firstParty ?? false
    if (!authRequest.isAuthorizationApproved) {
      res.redirect(`/auth/consent?${queryString.stringify(req.query)}`)
      return
    }

    const authResponse = await res.locals.auth.completeAuthorizationRequest(authRequest)

    handleExpressResponse(res, authResponse)
  } catch (err) {
    next(err)
  }
}

export const tokenHandler: RequestHandler<any, ApiResponse, TokenRequest> = async (req, res, next) => {
  try {
    res.locals.logger.info('Handling incoming token request...')
    if (req.body.grant_type === 'refresh_token') {
      if (!req.session.userId) {
        throw ApiError.unauthenticated()
      }

      const count = await res.locals.prisma.user.count({
        where: { id: req.session.userId, removedAt: null },
      })

      if (!count) {
        throw ApiError.unauthenticated()
      }
    }

    const authResponse = await res.locals.auth.respondToAccessTokenRequest(req)

    handleExpressResponse(res, authResponse)
  } catch (err) {
    next(err)
  }
}

export const introspectHandler: RequestHandler<any, ApiResponse, IntrospectTokenRequest> = async (req, res, next) => {
  try {
    res.locals.logger.info('Handling incoming introspect request...')
    const authResponse = await res.locals.auth.introspect(req)

    handleExpressResponse(res, authResponse)
  } catch (err) {
    next(err)
  }
}

export const revokeHandler: RequestHandler<any, ApiResponse, RevokeTokenRequest> = async (req, res, next) => {
  res.locals.logger.info('Handling incoming revoke request...')

  req.session.destroy((err) => {
    if (err) {
      next(err)
      return
    }

    res.locals.auth
      .revoke(req)
      .then((authResponse) => {
        try {
          handleExpressResponse(res, authResponse)
        } catch (err) {
          next(err)
        }
      })
      .catch((err) => {
        next(err)
      })
  })
}
