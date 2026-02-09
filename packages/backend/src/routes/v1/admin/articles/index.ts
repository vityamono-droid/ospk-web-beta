import { Router } from 'express'
// Handlers
import { deleteCatalog, getCatalog, listCatalogs, upsertCatalog } from './handlers/catalog.handlers'
import { deleteCategory, getCategory, listCategories, upsertCategory } from './handlers/category.handlers'
import { deleteArticle, getArticle, listArticles, upsertArticle } from './handlers/article.handlers'

const articlesRouter = Router()

// Catalogs
articlesRouter.get('/catalogs/', listCatalogs)
articlesRouter.get('/catalogs/:id', getCatalog)
articlesRouter.post('/catalogs', upsertCatalog)
articlesRouter.put('/catalogs/:id', upsertCatalog)
articlesRouter.delete('/catalogs:id', deleteCatalog)
// Categories
articlesRouter.get('/categories', listCategories)
articlesRouter.get('/categories/:id', getCategory)
articlesRouter.post('/categories', upsertCategory)
articlesRouter.put('/categories/:id', upsertCategory)
articlesRouter.delete('/categories/:id', deleteCategory)
// Articles
articlesRouter.get('/', listArticles)
articlesRouter.get('/:id', getArticle)
articlesRouter.post('/', upsertArticle)
articlesRouter.put('/:id', upsertArticle)
articlesRouter.delete('/:id', deleteArticle)

export default articlesRouter
