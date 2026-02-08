import { Router } from 'express'
// Auth
import clientsRouter from './clients'
// Articles
import articlesRouter from './articles'
import articleCatalogsRouter from './articleCatalogs'
import articleCategoriesRouter from './articleCategories'
// Services
import servicesRouter from './services'
import serviceUnitsRouter from './serviceUnits'
import serviceCategoriesRouter from './serviceCategories'
import serviceCatalogsRouter from './serviceCatalogs'

const adminRouter = Router()

adminRouter.use('/clients', clientsRouter)
// Articles
adminRouter.use('/articles', articlesRouter)
adminRouter.use('/articleCatalogs', articleCatalogsRouter)
adminRouter.use('/articleCategories', articleCategoriesRouter)
// Services
adminRouter.use('/services', servicesRouter)
adminRouter.use('/serviceCatalogs', serviceCatalogsRouter)
adminRouter.use('/serviceCategories', serviceCategoriesRouter)
adminRouter.use('/serviceUnits', serviceUnitsRouter)

export default adminRouter
