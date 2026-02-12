import { Router } from 'express'
// Handlers
import { deleteCatalog, getCatalog, listCatalogs, upsertCatalog } from './handlers/catalog.handlers'
import { deleteCategory, getCategory, listCategories, upsertCategory } from './handlers/category.handlers'
import { deleteArticle, getArticle, listArticles, upsertArticle } from './handlers/article.handlers'
import withFormData from '@middleware/formData.middleware'
import withParseForm from '@middleware/parseForm.middleware'

const articlesRouter = Router()

// Catalogs
articlesRouter.get('/catalogs/', listCatalogs)
articlesRouter.get('/catalogs/:id', getCatalog)
articlesRouter.post(
  '/catalogs',
  withFormData({ type: 'SINGLE', fieldName: 'banner' }),
  withParseForm({ dest: 'static/articles/banners' }),
  upsertCatalog,
)
articlesRouter.put(
  '/catalogs/:id',
  withFormData({ type: 'SINGLE', fieldName: 'banner' }),
  withParseForm({ dest: 'static/articles/banners' }),
  upsertCatalog,
)
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
articlesRouter.post(
  '/',
  withFormData({ type: 'SINGLE', fieldName: 'banner' }),
  withParseForm({ dest: 'static/articles/banners' }),
  upsertArticle,
)
articlesRouter.put(
  '/:id',
  withFormData({ type: 'SINGLE', fieldName: 'banner' }),
  withParseForm({ dest: 'static/articles/banners' }),
  upsertArticle,
)
articlesRouter.delete('/:id', deleteArticle)

export default articlesRouter
