import { Router } from 'express'

import servicesRouter from './services'
import articlesRouter from './articles'
import departmentsRouter from './departments'
import carouselsRouter from './carousels'
import commentsRouter from './comments'
import requestsRouter from './requests'
import ordersRouter from './orders'

const clientRouter = Router()

clientRouter.use('/services', servicesRouter)
clientRouter.use('/articles', articlesRouter)
clientRouter.use('/departments', departmentsRouter)
clientRouter.use('/carousels', carouselsRouter)
clientRouter.use('/comments', commentsRouter)
clientRouter.use('/requests', requestsRouter)
clientRouter.use('/orders', ordersRouter)

export default clientRouter
