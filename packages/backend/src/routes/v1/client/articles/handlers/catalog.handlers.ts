import { RequestHandler } from 'express'

import { ApiResponse } from '@ospk/web-models'
import { CatalogData, CatalogItem } from '@ospk/web-models/articles'

// GET /api/v1/articles/catalogs
type ListCatalogsRequest = RequestHandler<any, ApiResponse<CatalogItem[]>>
export const listCatalogs: ListCatalogsRequest = async (_, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalogs = await prisma.newsCatalog.findMany({
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

// GET /api/v1/articles/catalogs/:id
type GetCatalogRequest = RequestHandler<IdParams, ApiResponse<CatalogData>>
export const getCatalog: GetCatalogRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalog = await prisma.newsCatalog.findUniqueOrThrow({
      where: {
        id: req.params.id,
        disabled: false,
        removedAt: null },
      select: {
        label: true,
        banner: true,
        description: true,
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
