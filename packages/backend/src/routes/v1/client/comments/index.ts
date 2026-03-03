import { Router } from 'express'
import { addComment, listComments } from './handlers'
import withAuth from '@middleware/auth.middleware'

const commentsRouter = Router()

commentsRouter.get('/', listComments)
commentsRouter.post('/', withAuth, addComment)

export default commentsRouter
