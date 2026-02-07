import { Router } from 'express'
import { addUnit, deleteUnit, listUnits, updateUnit } from './handlers'

const serviceUnitsRouter = Router()

serviceUnitsRouter.get('/units', listUnits)
serviceUnitsRouter.post('/units/', addUnit)
serviceUnitsRouter.patch('/units/:id', updateUnit)
serviceUnitsRouter.delete('/units/:id', deleteUnit)

export default serviceUnitsRouter
