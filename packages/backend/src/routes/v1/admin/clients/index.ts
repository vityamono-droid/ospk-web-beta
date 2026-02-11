import { Router } from 'express'
import { deleteClient, getClient, listClients, upsertClient } from './handlers/client.handlers'
import { deleteRole, getRole, listRoles, upsertRole } from './handlers/role.handlers'
import withFormData from '@middleware/formData.middleware'
import withParseForm from '@middleware/parseForm.middleware'

const clientsRouter = Router()

clientsRouter.get('/roles', listRoles)
clientsRouter.get('/roles/:id', getRole)
clientsRouter.post('/roles', upsertRole)
clientsRouter.put('/roles/:id', upsertRole)
clientsRouter.delete('/roles/:id', deleteRole)

clientsRouter.get('/', listClients)
clientsRouter.get('/:id', getClient)
clientsRouter.post(
  '/',
  withFormData({ type: 'SINGLE', fieldName: 'avatar' }),
  withParseForm({ dest: 'static/avatars' }),
  upsertClient,
)
clientsRouter.put(
  '/:id',
  withFormData({ type: 'SINGLE', fieldName: 'avatar' }),
  withParseForm({ dest: 'static/avatars' }),
  upsertClient,
)
clientsRouter.delete('/:id', deleteClient)

export default clientsRouter
