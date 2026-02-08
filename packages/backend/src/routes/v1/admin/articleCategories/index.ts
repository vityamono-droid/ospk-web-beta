import { Router } from 'express'
import {
  deleteArticleCategory,
  getArticleCategory,
  listArticleCategories,
  upsertArticleCategory,
} from './handlers'

const articleCategoriesRouter = Router()

articleCategoriesRouter.get('/', listArticleCategories)
articleCategoriesRouter.get('/:id', getArticleCategory)
articleCategoriesRouter.post('/', upsertArticleCategory)
articleCategoriesRouter.put('/:id', upsertArticleCategory)
articleCategoriesRouter.delete('/:id', deleteArticleCategory)

export default articleCategoriesRouter
