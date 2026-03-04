import { Router } from 'express'
import { listOrders, upsertOrder } from './handlers'

const ordersRouter = Router()

ordersRouter.get('/', listOrders)
ordersRouter.put('/:id', upsertOrder)

export default ordersRouter
