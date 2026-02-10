import { Router } from 'express';
import servicesRouter from './services';
import articlesRouter from './articles'

const clientRouter = Router()

clientRouter.use('/services', servicesRouter)
clientRouter.use('/articles', articlesRouter)

export default clientRouter
