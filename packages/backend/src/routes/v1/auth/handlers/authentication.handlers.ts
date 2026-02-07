import { RequestHandler } from 'express'
import type { AuthorizeRequest, LoginRequest, RegisterRequest } from '@ospk/web-models/auth'
import User from '@models/User'
import ApiError from '@models/ApiError'
import queryString from 'query-string'

export const loginHandler: RequestHandler<any, any, LoginRequest, AuthorizeRequest> = async (req, res, next) => {
  try {
    res.locals.logger.info('Handling incoming login request...')
    if (!req.body) {
      throw ApiError.missingCredentials()
    }

    const { email, password } = req.body
    if (!email || !password) {
      throw ApiError.missingCredentials()
    }

    const prisma = res.locals.prisma
    let user = await prisma.user.findUnique({
      where: { email: email, removedAt: null },
    })

    if (!user) {
      throw ApiError.invalidCredentials()
    }

    if (!res.locals.hasher.validate(password, user.password)) {
      throw ApiError.invalidCredentials()
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        ips: {
          connectOrCreate: {
            where: { userId_ipAddress: { userId: user.id, ipAddress: req.ip ?? '127.0.0.1' } },
            create: {
              ipAddress: req.ip ?? '127.0.0.1',
              userAgent: req.headers['user-agent'],
            },
          },
        },
      },
    })

    req.session.user = new User(user)
    res.redirect(`${req.baseUrl}/authorize?${queryString.stringify(req.query)}`)
    res.locals.logger.info('Success handling login request')
  } catch (err) {
    next(err)
  }
}
export const registerHandler: RequestHandler<any, any, RegisterRequest, AuthorizeRequest> = async (req, res, next) => {
  try {
    res.locals.logger.info('Handling incoming register request...')
    if (!req.body) {
      throw ApiError.missingCredentials()
    }

    const { email, username, password } = req.body
    if (!email || !username || !password) {
      throw ApiError.missingCredentials()
    }

    const prisma = res.locals.prisma
    const exists = await prisma.user.count({
      where: {
        OR: [
          { username: username },
          {
            email: {
              equals: email,
              mode: 'insensitive',
            },
          },
        ],
        removedAt: null,
      },
    })

    if (exists) {
      throw ApiError.credentialsTaken()
    }

    const user = await prisma.user.create({
      data: {
        email: email,
        username: username,
        password: res.locals.hasher.generate(password),
        ips: {
          create: {
            ipAddress: req.ip ?? '127.0.0.1',
          },
        },
      },
    })

    req.session.user = new User(user)
    res.redirect(`${req.baseUrl}/authorize?${queryString.stringify(req.query)}`)
    res.locals.logger.info('Success handling register request')
  } catch (err) {
    next(err)
  }
}
