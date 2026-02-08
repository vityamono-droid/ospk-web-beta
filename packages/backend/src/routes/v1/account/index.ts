import { Router } from 'express';
import { getAccount } from './handlers';

import withAuth from '@middleware/auth.middleware';

const accountRouter = Router()

accountRouter.get('/', withAuth, getAccount)

export default accountRouter
