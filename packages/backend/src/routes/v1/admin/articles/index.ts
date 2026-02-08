import { Router } from 'express'
import { deleteArticle, getArticle, listArticles, updateArticleList, upsertArticle } from './handlers'

const articlesRouter = Router()

articlesRouter.get('/', listArticles)
articlesRouter.get('/:id', getArticle)
articlesRouter.post('/', upsertArticle)
articlesRouter.put('/:id', upsertArticle)
articlesRouter.delete('/:id', deleteArticle)

export default articlesRouter
