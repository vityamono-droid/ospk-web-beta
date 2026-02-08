import { Router } from 'express';
import servicesRouter from './services';

const clientRouter = Router()

clientRouter.use('/services', servicesRouter)

export default clientRouter
