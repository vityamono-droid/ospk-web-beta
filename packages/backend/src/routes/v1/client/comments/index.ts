import { Router } from 'express'
import { addComment, listComments, voteComment } from './handlers'
import withAuth from '@middleware/auth.middleware'

const commentsRouter = Router()

commentsRouter.get('/', listComments)
commentsRouter.post('/', withAuth, addComment)
commentsRouter.put('/:id', withAuth, voteComment)

export default commentsRouter
