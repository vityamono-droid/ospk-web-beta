import { RequestHandler } from 'express'
import type { ApiResponse } from '@ospk/web-models'
import {
  type ServiceDetailsAction,
  type UpsertServiceDetails,
  type ListServiceDetailsQuery,
  type ServiceDetails,
} from '@ospk/web-models/services'

// GET /api/v1/admin/services
type ListServicesRequest = RequestHandler<any, ApiResponse<ServiceDetails[]>, any, ListServiceDetailsQuery>
export const listServices: ListServicesRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const services = await prisma.service.findMany({
      where: {
        label: req.query.label && { contains: req.query.label, mode: 'insensitive' },
        forLegals: !!req.query.forLegals ? JSON.parse(`${req.query.forLegals}`) : undefined,
        disabled: !!req.query.disabled ? JSON.parse(`${req.query.disabled}`) : undefined,
        catalogId: req.query.catalogs && { in: req.query.catalogs },
        categoryId: req.query.categories && { in: req.query.categories },
        departments: req.query.departments && {
          some: {
            departmentId: { in: req.query.departments },
          },
        },
      },
      omit: {
        banner: true,
        content: true,
        unitId: true,
        catalogId: true,
        categoryId: true,
      },
      include: {
        _count: {
          select: { comments: true, statistics: true },
        },
        unit: {
          select: { label: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      skip: typeof req.query.offset === 'undefined' ? undefined : +req.query.offset,
      take: typeof req.query.limit === 'undefined' ? undefined : +req.query.limit,
    })

    res.json({
      error: false,
      data: services.map((item) => ({
        ...item,
        _count: undefined,
        comments: item._count.comments,
        statistics: item._count.statistics,
        unit: item.unit?.label,
      })),
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/admin/services/:id
type GetServiceRequest = RequestHandler<IdParams, ApiResponse<UpsertServiceDetails>>
export const getService: GetServiceRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const service = await prisma.service.findUniqueOrThrow({
      where: { id: req.params.id },
      omit: {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
      include: {
        departments: {
          select: {
            available: true,
            departmentId: true,
          },
        },
      },
    })

    res.json({
      error: false,
      data: service,
    })
  } catch (err) {
    next(err)
  }
}

// POST:PUT /api/v1/admin/services/:id?
type UpsertServiceRequest = RequestHandler<IdParams, ApiResponse, UpsertServiceDetails>
export const upsertService: UpsertServiceRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma
    const { departments, price, vat, ...service } = req.body

    let priceHistory = {
      create: {
        price: price,
        vat: vat,
      },
    } as any

    if (!!req.params.id) {
      const service = await prisma.service.findUniqueOrThrow({
        where: { id: req.params.id },
        select: { price: true, vat: true },
      })

      if (service.price == price && service.vat == vat) {
        priceHistory = undefined
      }
    }

    const data = {
      ...service,
      price: price,
      vat: vat,
      departments: {
        createMany: req.body.departments && {
          data: req.body.departments,
          skipDuplicates: true,
        },
      },
      priceHistory,
    }

    let upserted
    if (!!req.params.id) {
      upserted = await prisma.service.update({
        where: { id: req.params.id },
        data: {
          ...data,
          banner: req.body.banner == null ? null : req.file?.path,
        },
      })
    } else {
      upserted = await prisma.service.create({
        data: {
          ...data,
          banner: req.file?.path,
        },
      })
    }

    res.json({
      error: false,
      data: upserted.id,
    })
  } catch (err) {
    next(err)
  }
}

// PATCH /api/v1/admin/services
type UpdateServiceListRequest = RequestHandler<any, ApiResponse, ServiceDetailsAction>
export const updateServiceList: UpdateServiceListRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    switch (req.body.action) {
      case 0: {
        await prisma.service.updateMany({
          where: {
            id: { in: req.body.ids },
          },
          data: { disabled: req.body.status },
        })

        break
      }
      case 1: {
        await prisma.service.updateMany({
          where: {
            id: { in: req.body.ids },
          },
          data: { removedAt: new Date() },
        })

        break
      }
    }

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/v1/admin/services/:id
type DeleteServiceRequest = RequestHandler<IdParams, ApiResponse>
export const deleteService: DeleteServiceRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const service = await prisma.service.findUniqueOrThrow({
      where: { id: req.params.id },
      select: { removedAt: true },
    })

    await prisma.service.update({
      where: { id: req.params.id },
      data: {
        removedAt: !!service.removedAt ? null : new Date(),
      },
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}
