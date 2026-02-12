import { Router } from 'express'
import { deleteDepartment, getDepartment, listDepartments, upsertDepartment } from './handlers'

const departmentsRouter = Router()

departmentsRouter.get('/', listDepartments)
departmentsRouter.get('/:id', getDepartment)
departmentsRouter.post('/', upsertDepartment)
departmentsRouter.put('/:id', upsertDepartment)
departmentsRouter.delete('/:id', deleteDepartment)

export default departmentsRouter
