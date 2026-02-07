import { Router } from 'express';
import { addClient, deleteClient, getClient, listClients, updateClient, updateClientList } from './handlers';

const clientsRouter = Router()

clientsRouter.get('/', listClients)

clientsRouter.get(':id', getClient)

clientsRouter.post(':id', addClient)

clientsRouter.put(':id', updateClient)

clientsRouter.patch('/', updateClientList)

clientsRouter.delete('/', deleteClient)

export default clientsRouter
