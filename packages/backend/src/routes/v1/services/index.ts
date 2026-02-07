import { Router } from 'express'
import { addService, deleteService, getService, listServices, updateService, updateServiceList } from './handlers'

const servicesRouter = Router()

servicesRouter.get('/', listServices)
servicesRouter.get('/:id', getService)
servicesRouter.post('/', addService)
servicesRouter.patch(':id', updateService)
servicesRouter.patch('/', updateServiceList)
servicesRouter.delete(':id', deleteService)

export default servicesRouter
