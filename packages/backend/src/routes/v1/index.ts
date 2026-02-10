import { Router } from 'express'
import authRouter from './auth'
import accountRouter from './account'
import adminRouter from './admin'
import clientRouter from './client'
import withAuth from '@middleware/auth.middleware'

const v1Router = Router()

v1Router.use('/auth', authRouter)
v1Router.use('/account', accountRouter)
v1Router.use('/admin', withAuth, adminRouter)
v1Router.use('/', clientRouter)

export default v1Router
