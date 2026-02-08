import { Router } from 'express';
import { addClient, deleteClient, getClient, listClients, updateClient, updateClientList } from './handlers';

const clientsRouter = Router()

clientsRouter.get('/', listClients)
clientsRouter.get('/:id', getClient)
clientsRouter.post('/', addClient)
clientsRouter.put('/:id', updateClient)
clientsRouter.patch('/', updateClientList)
clientsRouter.delete('/:id', deleteClient)

export default clientsRouter
