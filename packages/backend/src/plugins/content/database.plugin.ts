import { RequestHandler } from 'express'
import instance from '@ospk/web-database'

const prisma = instance

export const getDatabase = () => prisma

const useDatabase: RequestHandler = (_req, res, next) => {
  res.locals.prisma = prisma

  next()
}

export default useDatabase
