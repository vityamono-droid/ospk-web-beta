import { Router } from 'express'
import { deleteCategory, getCategory, listCategories, listRequests, upsertCategory } from './handlers'

const requestsRouter = Router()

requestsRouter.get('/categories', listCategories)
requestsRouter.get('/categories/:id', getCategory)
requestsRouter.put('/categories/:id', upsertCategory)
requestsRouter.post('/categories', upsertCategory)
requestsRouter.delete('/categories/:id', deleteCategory)
requestsRouter.get('/', listRequests)

export default requestsRouter
