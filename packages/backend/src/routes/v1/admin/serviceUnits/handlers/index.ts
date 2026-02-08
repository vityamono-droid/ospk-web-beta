import { RequestHandler } from 'express'
import type { ApiResponse, IdParams } from '@ospk/web-models'
import type { AddUnitRequest, UnitDetails, UpdateUnitRequest } from '@ospk/web-models/services'

export const listUnits: RequestHandler<any, ApiResponse<UnitDetails[]>, any> = async (_, res, next) => {
  try {
    const prisma = res.locals.prisma

    const units = await prisma.unit.findMany({
      select: { id: true, label: true, removedAt: true },
    })

    res.json({
      error: false,
      data: units.map((item) => ({
        ...item,
        removedAt: undefined,
        removed: !!item.removedAt,
      })),
    })
  } catch (err) {
    next(err)
  }
}

export const addUnit: RequestHandler<any, ApiResponse, AddUnitRequest> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    await prisma.unit.create({
      data: req.body,
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}

export const updateUnit: RequestHandler<IdParams, ApiResponse, UpdateUnitRequest> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    await prisma.unit.update({
      where: { id: req.params.id },
      data: req.body,
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}

export const deleteUnit: RequestHandler<IdParams, ApiResponse, any> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    await prisma.unit.update({
      where: { id: req.params.id },
      data: {
        removedAt: new Date(),
      },
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}
