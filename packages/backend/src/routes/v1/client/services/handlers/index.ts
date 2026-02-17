import { ApiResponse } from '@ospk/web-models'
import { ServiceCatalogNav, ServiceCatalogNavDetails, ServiceNavDetails } from '@ospk/web-models/services'
import { RequestHandler } from 'express'

export const listCatalogs: RequestHandler<any, ApiResponse<ServiceCatalogNav[]>> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalogs = await prisma.serviceCatalog.findMany({
      where: {
        disabled: false,
        removedAt: null,
      },
      select: {
        id: true,
        label: true,
      },
    })

    res.json({
      error: false,
      data: catalogs,
    })
  } catch (err) {
    next(err)
  }
}

export const getCatalog: RequestHandler<IdParams, ApiResponse<ServiceCatalogNavDetails>> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalog = await prisma.serviceCatalog.findUniqueOrThrow({
      where: {
        id: req.params.id,
        disabled: false,
        removedAt: null,
      },
      select: {
        label: true,
        banner: true,
        description: true,
        categories: {
          where: {
            disabled: false,
            removedAt: null,
          },
          select: {
            id: true,
            label: true,
            description: true,
            services: {
              where: {
                disabled: false,
                removedAt: null,
              },
              select: {
                id: true,
                label: true,
                amountType: true,
                content: true,
                vat: true,
                price: true,
                forLegals: true,
                unit: {
                  select: {
                    label: true,
                  },
                },
              },
            },
          },
        },
      },
    })

    res.json({
      error: false,
      data: {
        ...catalog,
        categories: catalog.categories.map((category) => ({
          ...category,
          services: category.services.map((service) => ({
            ...service,
            content: !!service.content,
            unit: service.unit?.label,
          })),
        })),
      },
    })
  } catch (err) {
    next(err)
  }
}

export const getService: RequestHandler<any, ApiResponse<ServiceNavDetails>> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const service = await prisma.service.findUniqueOrThrow({
      where: {
        id: req.params.id,
        disabled: false,
        removedAt: null,
      },
      select: {
        label: true,
        banner: true,
        content: true,
        createdAt: true,
        priceHistory: {
          select: {
            vat: true,
            price: true,
            createdAt: true,
          },
        },
        _count: {
          select: {
            statistics: true,
          },
        },
      },
    })

    await prisma.service.update({
      where: { id: req.params.id },
      data: {
        statistics: {
          create: { type: 'VIEW' },
        },
      },
    })

    res.json({
      error: false,
      data: {
        ...service,
        _count: undefined,
        statistics: service._count.statistics,
      } as any,
    })
  } catch (err) {
    next(err)
  }
}
