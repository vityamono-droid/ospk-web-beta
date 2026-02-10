import { Router } from 'express'
// Handlers
import { deleteCatalog, getCatalog, listCatalogs, upsertCatalog } from './handlers/catalog.handlers'
import { deleteCategory, getCategory, listCategories, upsertCategory } from './handlers/category.handlers'
import { deleteUnit, listUnits, upsertUnit } from './handlers/units.handlers'
import { deleteService, getService, listServices, updateServiceList, upsertService } from './handlers/service.handlers'

const servicesRouter = Router()

// Catalogs
servicesRouter.get('/catalogs', listCatalogs)
servicesRouter.get('/catalogs/:id', getCatalog)
servicesRouter.post('/catalogs', upsertCatalog)
servicesRouter.put('/catalogs/:id', upsertCatalog)
servicesRouter.delete('/catalogs/:id', deleteCatalog)
// Categories
servicesRouter.get('/categories', listCategories)
servicesRouter.get('/categories/:id', getCategory)
servicesRouter.post('/categories', upsertCategory)
servicesRouter.put('/categories/:id', upsertCategory)
servicesRouter.delete('/categories/:id', deleteCategory)
// Units
servicesRouter.get('/units', listUnits)
servicesRouter.post('/units', upsertUnit)
servicesRouter.put('/units/:id', upsertUnit)
servicesRouter.delete('/units/:id', deleteUnit)
// Services
servicesRouter.get('/', listServices)
servicesRouter.get('/:id', getService)
servicesRouter.post('/', upsertService)
servicesRouter.put(':id', upsertService)
servicesRouter.patch('/', updateServiceList)
servicesRouter.delete('/:id', deleteService)

export default servicesRouter
