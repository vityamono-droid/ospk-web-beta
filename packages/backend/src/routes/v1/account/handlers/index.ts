import { RequestHandler } from 'express'
import { ApiResponse } from '@ospk/web-models'
import { AccountData } from '@ospk/web-models/auth'

export const getAccount: RequestHandler<any, ApiResponse<AccountData>> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const user = await prisma.user.findUniqueOrThrow({
      where: { id: req.session.userId },
      omit: {
        id: true,
        password: true,
        removedAt: true,
        lastLoginAt: true,
      },
      include: {
        roles: {
          select: { name: true },
        },
      },
    })

    res.json({
      error: false,
      data: {
        ...user,
        roles: user.roles.map((item) => item.name),
        profileId: user.profileId!,
      },
    })
  } catch (err) {
    next(err)
  }
}
