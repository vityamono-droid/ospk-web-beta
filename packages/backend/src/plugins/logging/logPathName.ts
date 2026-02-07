import type { RequestHandler } from 'express'
import useLogger from './logger.plugin'

const useLogPathName: RequestHandler = (req, res, next) => {
  console.log(' ')
  console.log(`${req.path.toUpperCase()}`)
  console.log(' ')

  res.locals.logger = useLogger(req.path.split('/').pop())

  next()
}

export default useLogPathName
