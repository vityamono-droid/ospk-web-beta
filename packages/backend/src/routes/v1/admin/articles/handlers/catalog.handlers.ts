import { RequestHandler } from 'express'

import { ApiResponse } from '@ospk/web-models'
import { CatalogDetails, ListCatalogDetailsQuery, UpsertCatalogDetails } from '@ospk/web-models/articles'

// GET /api/v1/admin/articles/catalogs
type ListCatalogsRequest = RequestHandler<any, ApiResponse<CatalogDetails[]>, any, ListCatalogDetailsQuery>
export const listCatalogs: ListCatalogsRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const { limit, offset } = req.query

    const catalogs = await prisma.newsCatalog.findMany({
      where: req.query.activeOnly
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
          select: { news: true, categories: true },
        },
      },
      take: typeof limit === 'undefined' ? undefined : +limit,
      skip: typeof offset === 'undefined' ? undefined : +offset,
    })

    res.json({
      error: false,
      data: catalogs.map((item) => ({
        ...item,
        _count: undefined,
        news: item._count.news,
        categories: item._count.categories,
      })),
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/admin/articles/catalogs/:id
type GetCatalogRequest = RequestHandler<IdParams, ApiResponse<UpsertCatalogDetails>>
export const getCatalog: GetCatalogRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalog = await prisma.newsCatalog.findUniqueOrThrow({
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

// POST:PUT /api/v1/admin/articles/catalogs/:id?
type UpsertCatalogRequest = RequestHandler<IdParams, ApiResponse, UpsertCatalogDetails>
export const upsertCatalog: UpsertCatalogRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    if (!!req.params.id) {
      await prisma.newsCatalog.update({
        where: { id: req.params.id },
        data: req.body,
      })
    } else {
      await prisma.newsCatalog.create({
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

// DELETE /api/v1/admin/articles/catalogs/:id
type DeleteCatalogRequest = RequestHandler<IdParams, ApiResponse>
export const deleteCatalog: DeleteCatalogRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalog = await prisma.newsCatalog.findUniqueOrThrow({
      where: { id: req.params.id },
      select: { removedAt: true },
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
