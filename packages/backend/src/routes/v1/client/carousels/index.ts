import { RequestHandler, Router } from 'express'

import { ApiResponse } from '@ospk/web-models'
import { CarouselData } from '@ospk/web-models/carousels'

const carouselsRouter = Router()

carouselsRouter.get('/', <RequestHandler<any, ApiResponse<CarouselData[]>>>(async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const carousels = await prisma.carousel.findMany({
      where: {
        disabled: false,
        removedAt: null,
        // durationFrom: {
        //   lte: new Date(),
        // },
        // durationTo: {
        //   gte: new Date(),
        // },
      },
      select: {
        banner: true,
        link: true,
        label: true,
        placement: true,
      },
    })

    res.json({
      error: false,
      data: carousels
    })
  } catch (err) {
    next(err)
  }
}))

export default carouselsRouter
