import { Router } from 'express';
import { getAccount } from './handlers';

import withAuth from '@middleware/auth.middleware';

const accountRouter = Router()

accountRouter.get('/', withAuth, getAccount)
accountRouter.post('/verify', withAuth, async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    await prisma.user.update({
      where: { id: req.session.userId },
      data: { verified: true },
    })

    res.json({
      error: true,
    })
  } catch (err) {
    next(err)
  }
})

export default accountRouter
