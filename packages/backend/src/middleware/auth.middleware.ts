import { RequestHandler } from 'express'

import ApiError from '@models/ApiError'
import User from '@models/User'
import type { IntrospectTokenResponse } from '@ospk/web-models/auth'

import config from '@config'

const withAuth: RequestHandler = async (req, res, next) => {
  try {
    const token_type = 'Bearer '
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith(token_type) ||
      req.headers.authorization.length <= token_type.length
    ) {
      throw undefined
    }

    const result = await fetch(`http://${config.app.host}:${config.app.port}/api/v1/auth/token/introspect`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: req.headers.authorization.split(' ').pop(),
      }),
    })
    if (!result.ok) {
      throw undefined
    }

    const tokenData = (await result.json()) as IntrospectTokenResponse
    if (!tokenData.active || !tokenData.sub) {
      throw undefined
    }

    const user = await res.locals.prisma.user.findUniqueOrThrow({
      where: { id: tokenData.sub, removedAt: null },
      include: { roles: true },
    })

    req.session.user = new User(user)
    req.session.userId = user.id

    res.locals.logger.info('User authenticated: %s', user.id)
    next()
  } catch {
    next(ApiError.unauthenticated())
  }
}

export default withAuth
