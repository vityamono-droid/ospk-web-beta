import { Router } from 'express';
// Auth
import authRouter from './auth';
import clientsRouter from './clients';
// Services
import servicesRouter from './services';
import serviceUnitsRouter from './serviceUnits';
import serviceCategoriesRouter from './serviceCategories';
import serviceCatalogsRouter from './serviceCatalogs';

const v1Router = Router()

v1Router.use('/auth', authRouter)
v1Router.use('/clients', clientsRouter)
v1Router.use('/services', servicesRouter)
v1Router.use('/serviceCatalogs', serviceCatalogsRouter)
v1Router.use('/serviceCategories', serviceCategoriesRouter)
v1Router.use('/serviceUnits', serviceUnitsRouter)

export default v1Router
