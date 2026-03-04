import { Router } from 'express'
import { listOrders, upsertOrder } from './handlers'
import withAuth from '@middleware/auth.middleware'

const ordersRouter = Router()

ordersRouter.get('/', withAuth, listOrders)
ordersRouter.post('/', withAuth, upsertOrder)
ordersRouter.put('/:id', withAuth, upsertOrder)

export default ordersRouter
