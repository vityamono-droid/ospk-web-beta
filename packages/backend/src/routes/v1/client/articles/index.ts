import { Router } from 'express'

import { listCatalogs, getCatalog } from './handlers/catalog.handlers'
import { listCategories } from './handlers/category.handlers'
import { getArticle, listArticles } from './handlers/article.handlers'

const articlesRouter = Router()

articlesRouter.get('/catalogs', listCatalogs)
articlesRouter.get('/catalogs/:id', getCatalog)
articlesRouter.get('/categories', listCategories)
articlesRouter.get('/', listArticles)
articlesRouter.get('/:id', getArticle)

export default articlesRouter
