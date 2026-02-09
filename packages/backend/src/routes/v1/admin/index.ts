import { Router } from 'express'
// Routers
import clientsRouter from './clients'
import articlesRouter from './articles'
import servicesRouter from './services'

const adminRouter = Router()

adminRouter.use('/clients', clientsRouter)
adminRouter.use('/articles', articlesRouter)
adminRouter.use('/services', servicesRouter)

export default adminRouter
