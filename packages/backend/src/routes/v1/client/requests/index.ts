import { Router } from 'express'
import { getCategory, getRequest, listCategories, upsertRequest } from './handlers'
import withAuth from '@middleware/auth.middleware'

const requestsRouter = Router()

requestsRouter.get('/categories', listCategories)
requestsRouter.get('/categories/:id', getCategory)
requestsRouter.get('/:id', getRequest)
requestsRouter.post('/', withAuth, upsertRequest)
requestsRouter.put('/:id', withAuth, upsertRequest)

export default requestsRouter
