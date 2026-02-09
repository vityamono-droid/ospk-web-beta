import { RequestHandler } from 'express'
import type { ApiResponse } from '@ospk/web-models'
import type { UnitDetails, UpsertUnitDetails } from '@ospk/web-models/services'

// GET /api/v1/admin/services/units
type ListUnitsRequest = RequestHandler<any, ApiResponse<UnitDetails[]>>
export const listUnits: ListUnitsRequest = async (_, res, next) => {
  try {
    const prisma = res.locals.prisma

    const units = await prisma.unit.findMany({
      omit: { createdAt: true, updatedAt: true },
      orderBy: { label: 'asc' },
    })

    res.json({
      error: false,
      data: units,
    })
  } catch (err) {
    next(err)
  }
}

// POST:PUT /api/v1/admin/services/units/:id?
type UpsertUnitRequest = RequestHandler<IdParams, ApiResponse, UpsertUnitDetails>
export const upsertUnit: UpsertUnitRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    if (!!req.params.id) {
      await prisma.unit.update({
        where: { id: req.params.id },
        data: req.body,
      })
    } else {
      await prisma.unit.create({
        data: req.body,
      })
    }

    res.json({
      error: true,
    })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/v1/admin/services/units/:id
type DeleteUnitRequest = RequestHandler<IdParams, ApiResponse>
export const deleteUnit: DeleteUnitRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const unit = await prisma.unit.findUniqueOrThrow({
      where: { id: req.params.id },
    })

    await prisma.unit.update({
      where: { id: req.params.id },
      data: {
        removedAt: !!unit.removedAt ? null : new Date(),
      },
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}
