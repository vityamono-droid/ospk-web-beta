import type { ErrorRequestHandler } from 'express'
import type { ApiResponse } from '@ospk/web-models'
import { PrismaClientKnownRequestError } from '@ospk/web-database'
import { isOAuthError } from '@jmondi/oauth2-server'
import { prismaError } from 'prisma-better-errors'
import ApiError from '@models/ApiError'

const useErrors: ErrorRequestHandler<any, ApiResponse> = (err, _req, res, next) => {
  res.locals.logger.error('Error handling request:', err)
  if (res.headersSent) {
    return next()
  }

  if (err instanceof ApiError) {
    res.status(err.status).json({
      error: true,
      message: err.message,
    })

    return
  }

  if (isOAuthError(err)) {
    res.status(err.status).json({
      error: true,
      message: err.message,
    })

    return
  }

  if (err instanceof PrismaClientKnownRequestError) {
    const fromPrisma = new prismaError(err)
    res.status(fromPrisma.statusCode).json({
      error: true,
      message: fromPrisma.message,
    })

    return
  }

  res.status(500).json({
    error: true,
    message: 'Internal server error',
  })
}

export default useErrors
