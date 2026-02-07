import { Router } from 'express'
import withClientAuth from '@middleware/clientAuth.middleware'
import * as handlers from './handlers'

const authRouter = Router()

authRouter.post('/login', handlers.loginHandler)

authRouter.post('/register', handlers.registerHandler)

authRouter.get('/authorize', withClientAuth('query'), handlers.authorizeHandler)

authRouter.post('/token', withClientAuth('body'), handlers.tokenHandler)

authRouter.post('/token/introspect', withClientAuth('body'), handlers.introspectHandler)

authRouter.post('/token/revoke', withClientAuth('body'), handlers.revokeHandler)

export default authRouter
