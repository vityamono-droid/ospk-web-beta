import { RequestHandler } from 'express'

import { ApiResponse } from '@ospk/web-models'
import { CatalogData, CatalogDataDetails, ServiceDataDetails } from '@ospk/web-models/services'

// GET /api/v1/services/catalogs
type ListCatalogsRequest = RequestHandler<any, ApiResponse<CatalogData[]>>
export const listCatalogs: ListCatalogsRequest = async (_, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalogs = await prisma.serviceCatalog.findMany({
      where: {
        services: { some: {} },
        categories: { some: {} },
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

// GET /api/v1/services/catalogs/:id
type GetCatalogRequest = RequestHandler<IdParams, ApiResponse<CatalogDataDetails>>
export const getCatalog: GetCatalogRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalog = await prisma.serviceCatalog.findUniqueOrThrow({
      where: {
        id: req.params.id,
        services: { some: {} },
        categories: { some: {} },
        disabled: false,
        removedAt: null,
      },
      select: {
        label: true,
        banner: true,
        description: true,
        categories: {
          where: {
            services: { some: {} },
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
            unit: service.unit?.label,
          })),
        })),
      },
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/services/:id
type GetServiceRequest = RequestHandler<any, ApiResponse<ServiceDataDetails>>
export const getService: GetServiceRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const service = await prisma.service.findUniqueOrThrow({
      where: {
        id: req.params.id,
        disabled: false,
        removedAt: null,
      },
      omit: {
        id: true,
        vat: true,
        disabled: true,
        unitId: true,
        catalogId: true,
        categoryId: true,
        updatedAt: true,
        removedAt: true,
      },
      include: {
        _count: {
          select: {
            statistics: true,
          },
        },
        unit: {
          select: { label: true },
        },
        catalog: {
          select: { label: true },
        },
        category: {
          select: { label: true },
        },
        priceHistory: {
          omit: {
            id: true,
            updatedAt: true,
            removedAt: true,
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

    const { unit, catalog, category, _count, ...data } = service
    res.json({
      error: false,
      data: {
        ...data,
        unit: unit?.label,
        catalog: catalog.label,
        category: category?.label,
        statistics: _count.statistics,
      },
    })
  } catch (err) {
    next(err)
  }
}
