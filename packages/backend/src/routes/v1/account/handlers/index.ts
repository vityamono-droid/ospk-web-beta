import { RequestHandler } from 'express';
import { ApiResponse } from '@ospk/web-models';

export const getAccount: RequestHandler<any, ApiResponse> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    res.json({
      error: true,
    })
  } catch (err) {
    next(err)
  }
}
