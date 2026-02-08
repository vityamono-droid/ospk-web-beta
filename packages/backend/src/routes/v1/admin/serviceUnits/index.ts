import { Router } from 'express'
import { addUnit, deleteUnit, listUnits, updateUnit } from './handlers'

const serviceUnitsRouter = Router()

serviceUnitsRouter.get('/', listUnits)
serviceUnitsRouter.post('/', addUnit)
serviceUnitsRouter.patch('/:id', updateUnit)
serviceUnitsRouter.delete('/:id', deleteUnit)

export default serviceUnitsRouter
