import { RequestHandler } from 'express'

import { ApiResponse } from '@ospk/web-models'
import { CarouselDetails, UpsertCarouselDetails } from '@ospk/web-models/carousels'

type ListCarouselsRequest = RequestHandler<any, ApiResponse<CarouselDetails[]>>
export const listCarousels: ListCarouselsRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const carousels = await prisma.carousel.findMany({
      omit: {
        banner: true,
        link: true,
        description: true,
      },
    })

    res.json({
      error: false,
      data: carousels,
    })
  } catch (err) {
    next(err)
  }
}

type GetCarouselRequest = RequestHandler<IdParams, ApiResponse<UpsertCarouselDetails>>
export const getCarousel: GetCarouselRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const carousel = await prisma.carousel.findUniqueOrThrow({
      where: { id: req.params.id },
      omit: {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    res.json({
      error: false,
      data: carousel,
    })
  } catch (err) {
    next(err)
  }
}

type UpsertCarouselRequest = RequestHandler<IdParams, ApiResponse<string>, UpsertCarouselDetails>
export const upsertCarousel: UpsertCarouselRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    let newData
    if (!!req.params.id) {
      newData = await prisma.carousel.update({
        where: { id: req.params.id },
        data: {
          ...req.body,
          banner: req.file?.path,
          durationFrom: req.body.durationFrom && new Date(req.body.durationFrom),
          durationTo: req.body.durationTo && new Date(req.body.durationTo),
        },
      })
    } else {
      newData = await prisma.carousel.create({
        data: {
          ...req.body,
          banner: req.file?.path ?? '',
          durationFrom: req.body.durationFrom && new Date(req.body.durationFrom),
          durationTo: req.body.durationTo && new Date(req.body.durationTo),
        },
      })
    }

    res.json({
      error: false,
      data: newData.id,
    })
  } catch (err) {
    next(err)
  }
}

type DeleteCarouselRequest = RequestHandler<IdParams, ApiResponse>
export const deleteCarousel: DeleteCarouselRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const carousel = await prisma.carousel.findUniqueOrThrow({
      where: { id: req.params.id },
      select: { removedAt: true },
    })

    await prisma.carousel.update({
      where: { id: req.params.id },
      data: {
        removedAt: !!carousel.removedAt ? null : new Date(),
      },
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}
