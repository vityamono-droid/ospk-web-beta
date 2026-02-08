import { Router } from 'express'
import {
  deleteArticleCatalog,
  getArticleCatalog,
  listArticleCatalogs,
  upsertArticleCatalog,
} from './handlers'

const articleCatalogsRouter = Router()

articleCatalogsRouter.get('/', listArticleCatalogs)
articleCatalogsRouter.get('/:id', getArticleCatalog)
articleCatalogsRouter.post('/', upsertArticleCatalog)
articleCatalogsRouter.put('/:id', upsertArticleCatalog)
articleCatalogsRouter.delete('/:id', deleteArticleCatalog)

export default articleCatalogsRouter
