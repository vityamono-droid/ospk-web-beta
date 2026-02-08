import { Router } from 'express';
import { getArticle, getCatalog, listArticle, ListCatalogs } from './handlers'

const articlesRouter = Router()

articlesRouter.get('/catalogs', ListCatalogs)
articlesRouter.get('/catalogs/:id', getCatalog)
articlesRouter.get('/', listArticle)
articlesRouter.get('/:id', getArticle)

export default articlesRouter
