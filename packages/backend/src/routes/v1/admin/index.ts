import { Router } from 'express'
// Routers
import clientsRouter from './clients'
import departmentsRouter from './departments'
import articlesRouter from './articles'
import servicesRouter from './services'
import carouselsRouter from './carousels'

const adminRouter = Router()

adminRouter.use('/clients', clientsRouter)
adminRouter.use('/departments', departmentsRouter)
adminRouter.use('/articles', articlesRouter)
adminRouter.use('/services', servicesRouter)
adminRouter.use('/carousels', carouselsRouter)

export default adminRouter
