import { IntrospectTokenResponse } from '@ospk/web-models/auth'
import ApiError from '@models/ApiError'
import User from '@models/User'
import { RequestHandler } from 'express'
import config from '@config'

const withAuth: RequestHandler = async (req, res, next) => {
  try {
    const token_type = 'Bearer '
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith(token_type) ||
      req.headers.authorization.length <= token_type.length
    ) {
      throw ApiError.unauthenticated()
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
      throw ApiError.unauthenticated()
    }

    const tokenData = (await result.json()) as IntrospectTokenResponse
    if (!tokenData.active || !tokenData.sub) {
      throw ApiError.unauthenticated()
    }

    const userId = tokenData.sub
    const user = await res.locals.prisma.user.findUnique({
      where: { id: userId, removedAt: null }
    })

    if (!user) {
      throw ApiError.unauthenticated()
    }

    req.session.user = new User(user)
    req.session.userId = userId

    next()
  } catch(err) {
    next(err)
  }
}

export default withAuth
