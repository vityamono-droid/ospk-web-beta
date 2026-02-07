import { RequestHandler } from 'express'
import type { ApiResponse, IdParams } from '@ospk/web-models'
import type {
  AddServiceCatalogRequest,
  ServiceCatalog,
  ServiceCatalogDetails,
  UpdateServiceCatalogRequest,
} from '@ospk/web-models/services'

export const listCatalogs: RequestHandler<any, ApiResponse<ServiceCatalog[]>> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalogs = await prisma.serviceCatalog.findMany({
      select: {
        id: true,
        label: true,
        disabled: true,
        _count: {
          select: {
            categories: true,
            services: true,
          },
        },
        removedAt: true,
      },
    })

    res.json({
      error: false,
      data: catalogs.map((item) => ({
        ...item,
        _count: undefined,
        services: item._count.services,
        categories: item._count.categories,
        removedAt: item.removedAt ?? undefined,
        removed: !!item.removedAt,
      })),
    })
  } catch (err) {
    next(err)
  }
}

export const getCatalog: RequestHandler<IdParams, ApiResponse<ServiceCatalogDetails>> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalog = await prisma.serviceCatalog.findUniqueOrThrow({
      omit: {
        createdAt: true,
        updatedAt: true,
      },
      where: { id: req.params.id },
    })

    res.json({
      error: false,
      data: {
        ...catalog,
        banner: catalog.banner ?? undefined,
        description: catalog.description ?? undefined,
        removedAt: catalog.removedAt ?? undefined,
      },
    })
  } catch (err) {
    next(err)
  }
}

export const addCatalog: RequestHandler<any, ApiResponse, AddServiceCatalogRequest> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    await prisma.serviceCatalog.create({
      data: req.body,
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}

export const updateCatalog: RequestHandler<IdParams, ApiResponse, UpdateServiceCatalogRequest> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    await prisma.serviceCatalog.update({
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

export const deleteCatalog: RequestHandler<IdParams, ApiResponse> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    await prisma.serviceCatalog.update({
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
