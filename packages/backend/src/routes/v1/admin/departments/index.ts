import { Router } from 'express'

import { deleteDepartment, getDepartment, listDepartments, upsertDepartment } from './handlers/department.handlers'
import { deleteEmployee, getEmployee, listEmployees, upsertEmployee } from './handlers/employee.handlers'

import withFormData from '@middleware/formData.middleware'
import withParseForm from '@middleware/parseForm.middleware'

const departmentsRouter = Router()

departmentsRouter.get('/employees', listEmployees)
departmentsRouter.get('/employees/:id', getEmployee)
departmentsRouter.post(
  '/employees/',
  withFormData({ type: 'SINGLE', fieldName: 'banner' }),
  withParseForm({ dest: 'static/employee/photos' }),
  upsertEmployee,
)
departmentsRouter.put(
  '/employees/:id',
  withFormData({ type: 'SINGLE', fieldName: '' }),
  withParseForm({ dest: 'static/employee/photos' }),
  upsertEmployee,
)
departmentsRouter.delete('/employees/:id', deleteEmployee)

departmentsRouter.get('/', listDepartments)
departmentsRouter.get('/:id', getDepartment)
departmentsRouter.post('/', upsertDepartment)
departmentsRouter.put('/:id', upsertDepartment)
departmentsRouter.delete('/:id', deleteDepartment)

export default departmentsRouter
