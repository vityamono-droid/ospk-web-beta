import { RequestHandler } from 'express'
import type { ActiveOnlyQuery, ApiResponse } from '@ospk/web-models'
import type { CatalogDetails, UpsertCatalogDetails } from '@ospk/web-models/services'

// GET /api/v1/admin/services/catalogs
type ListCatalogsRequest = RequestHandler<any, ApiResponse<CatalogDetails[]>, any, ActiveOnlyQuery>
export const listCatalogs: ListCatalogsRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalogs = await prisma.serviceCatalog.findMany({
      where: !!req.query.activeOnly
        ? {
            disabled: false,
            removedAt: null,
          }
        : undefined,
      omit: {
        banner: true,
        description: true,
      },
      include: {
        _count: {
          select: { categories: true, services: true },
        },
      },
    })

    res.json({
      error: false,
      data: catalogs.map((item) => ({
        ...item,
        _count: undefined,
        services: item._count.services,
        categories: item._count.categories,
      })),
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/admin/services/catalogs/:id
type GetCatalogRequest = RequestHandler<IdParams, ApiResponse<UpsertCatalogDetails>>
export const getCatalog: GetCatalogRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalog = await prisma.serviceCatalog.findUniqueOrThrow({
      where: { id: req.params.id },
      omit: {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    res.json({
      error: false,
      data: catalog,
    })
  } catch (err) {
    next(err)
  }
}

// POST:PUT /api/v1/admin/services/catalogs/:id?
type UpsertCatalogRequest = RequestHandler<any, ApiResponse, UpsertCatalogDetails>
export const upsertCatalog: UpsertCatalogRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    if (!!req.params.id) {
      await prisma.serviceCatalog.update({
        where: { id: req.params.id },
        data: req.body,
      })
    } else {
      await prisma.serviceCatalog.create({
        data: req.body,
      })
    }

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/v1/admin/services/catalogs/:id
type DeleteCatalogRequest = RequestHandler<IdParams, ApiResponse>
export const deleteCatalog: DeleteCatalogRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalog = await prisma.newsCatalog.findUniqueOrThrow({
      where: { id: req.params.id },
    })

    await prisma.newsCatalog.update({
      where: { id: req.params.id },
      data: {
        removedAt: !!catalog.removedAt ? null : new Date(),
      },
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}
