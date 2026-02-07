import { Router } from 'express'
import { addCatalog, deleteCatalog, getCatalog, listCatalogs, updateCatalog } from './handlers'

const serviceCatalogsRouter = Router()

serviceCatalogsRouter.get('/', listCatalogs)
serviceCatalogsRouter.get('/:id', getCatalog)
serviceCatalogsRouter.post('/', addCatalog)
serviceCatalogsRouter.patch('/:id', updateCatalog)
serviceCatalogsRouter.delete('/:id', deleteCatalog)

export default serviceCatalogsRouter
