import { Router } from 'express';
import { getCatalog, getService, listCatalogs } from './handlers';

const servicesRouter = Router()

servicesRouter.get('/catalogs', listCatalogs)
servicesRouter.get('/catalogs/:id', getCatalog)
servicesRouter.get('/:id', getService)


export default servicesRouter
