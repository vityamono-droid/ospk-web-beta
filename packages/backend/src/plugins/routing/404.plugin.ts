import type { RequestHandler } from 'express'
import { ApiResponse } from '@ospk/web-models'

const use404: RequestHandler<any, ApiResponse> = (_req, res, next) => {
  if (res.headersSent) {
    return next()
  }

  res.status(404).json({
    error: true,
    message: 'Route not found',
  })
}

export default use404
