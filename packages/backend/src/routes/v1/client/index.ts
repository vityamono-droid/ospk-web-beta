import { Router } from 'express'

import servicesRouter from './services'
import articlesRouter from './articles'
import departmentsRouter from './departments'
import carouselsRouter from './carousels'

const clientRouter = Router()

clientRouter.use('/services', servicesRouter)
clientRouter.use('/articles', articlesRouter)
clientRouter.use('/departments', departmentsRouter)
clientRouter.use('/carousels', carouselsRouter)

export default clientRouter
