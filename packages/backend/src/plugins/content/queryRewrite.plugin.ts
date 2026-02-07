import type { RequestHandler } from 'express'

const useQueryRewrite: RequestHandler = (req, _res, next) => {
  Object.defineProperty(req, 'query', {
    ...Object.getOwnPropertyDescriptor(req, 'query'),
    value: req.query,
    writable: true,
  })

  next()
}

export default useQueryRewrite
