import { RequestHandler } from 'express'
import type { ApiResponse, IdParams } from '@ospk/web-models'
import {
  BULK_ACTIONS,
  type AddServiceRequest,
  type ListServicesRequest,
  type Service,
  type ServiceDetails,
  type UpdateServiceListRequest,
  type UpdateServiceRequest,
} from '@ospk/web-models/services'

export const listServices: RequestHandler<any, ApiResponse<Service[]>, any, ListServicesRequest> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const services = await prisma.service.findMany({
      select: {
        id: true,
        label: true,
        vat: true,
        price: true,
        unit: {
          select: {
            label: true,
          },
        },
        _count: {
          select: {
            comments: true,
          },
        },
        forLegals: true,
        disabled: true,
        amountType: true,
        removedAt: true,
      },
      where: {
        label: req.query.label && {
          contains: req.query.label,
          mode: 'insensitive',
        },
        catalogId: req.query.catalogs && {
          in: req.query.catalogs,
        },
        categoryId: req.query.categories && {
          in: req.query.categories,
        },
        departments: req.query.departments && {
          some: {
            departmentId: {
              in: req.query.departments,
            },
          },
        },
        forLegals: req.query.forLegals,
        disabled: req.query.disabled,
      },
      skip: +req.query.offset,
      take: +req.query.limit,
    })

    res.json({
      error: false,
      data: services.map((item) => ({
        ...item,
        _count: undefined,
        comments: item._count.comments,
        removedAt: item.removedAt ?? undefined,
        removed: !!item.removedAt,
        unit: item.unit?.label,
      })),
    })
  } catch (err) {
    next(err)
  }
}

export const getService: RequestHandler<IdParams, ApiResponse<ServiceDetails>, any> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const service = await prisma.service.findUniqueOrThrow({
      select: {
        id: true,
        label: true,
        vat: true,
        price: true,
        banner: true,
        content: true,
        forLegals: true,
        disabled: true,
        amountType: true,
        catalogId: true,
        categoryId: true,
        unitId: true,
        removedAt: true,
        departments: true,
        priceHistory: {
          select: {
            price: true,
            vat: true,
            createdAt: true,
          },
        },
      },
      where: { id: req.params.id },
    })

    res.json({
      error: false,
      data: {
        ...service,
        banner: service.banner ?? undefined,
        content: service.content ?? undefined,
        unitId: service.unitId ?? undefined,
        categoryId: service.categoryId ?? undefined,
        removedAt: service.removedAt ?? undefined,
        departments: service.departments.map((item) => ({
          available: item.available ?? undefined,
          departmentId: item.departmentId,
        })),
        priceHistory: service.priceHistory,
      },
    })
  } catch (err) {
    next(err)
  }
}

export const addService: RequestHandler<any, ApiResponse, AddServiceRequest> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    await prisma.service.create({
      data: {
        ...req.body,
        departments: {
          createMany: {
            data: req.body.departments,
            skipDuplicates: true,
          },
        },
        priceHistory: {
          create: {
            price: req.body.price,
            vat: req.body.vat,
          },
        },
      },
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}

export const updateService: RequestHandler<IdParams, ApiResponse, UpdateServiceRequest> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    let oldPriceEntry
    if (!!req.body.price) {
      oldPriceEntry = await prisma.servicePriceHistory.findFirst({
        select: { price: true, vat: true },
        where: { serviceId: req.params.id },
        orderBy: { createdAt: 'desc' },
      })
    }

    await prisma.service.update({
      where: { id: req.params.id },
      data: {
        ...req.body,
        departments: {
          createMany: req.body.departments && {
            data: req.body.departments,
            skipDuplicates: true,
          },
        },
        priceHistory:
          oldPriceEntry && (req.body.price || req.body.vat)
            ? {
                create: {
                  price: req.body.price ?? oldPriceEntry.price,
                  vat: req.body.vat ?? oldPriceEntry.vat,
                },
              }
            : undefined,
      },
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}

export const updateServiceList: RequestHandler<any, ApiResponse, UpdateServiceListRequest> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    switch (req.body.action) {
      case BULK_ACTIONS.STATUS: {
        await prisma.service.updateMany({
          where: {
            id: { in: req.body.ids },
          },
          data: {
            disabled: req.body.status,
          },
        })

        break
      }
      case BULK_ACTIONS.DELETE: {
        await prisma.service.updateMany({
          where: {
            id: { in: req.body.ids },
          },
          data: {
            removedAt: new Date(),
          },
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

export const deleteService: RequestHandler<IdParams, ApiResponse, any> = async (req, res, next) => {
  try {
    await res.locals.prisma.service.update({
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
