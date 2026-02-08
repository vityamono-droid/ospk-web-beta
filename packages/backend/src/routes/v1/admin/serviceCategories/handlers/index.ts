import { RequestHandler } from 'express'
import type { ApiResponse, IdParams } from '@ospk/web-models'
import type {
  AddServiceCategoryRequest,
  ServiceCategory,
  ServiceCategoryDetails,
  UpdateServiceCategoryRequest,
} from '@ospk/web-models/services'

export const listCategories: RequestHandler<any, ApiResponse<ServiceCategory[]>> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalogs = await prisma.serviceCategory.findMany({
      select: {
        id: true,
        label: true,
        disabled: true,
        _count: {
          select: {
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
        removedAt: item.removedAt ?? undefined,
        removed: !!item.removedAt,
      })),
    })
  } catch (err) {
    next(err)
  }
}

export const getCategory: RequestHandler<IdParams, ApiResponse<ServiceCategoryDetails>> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalog = await prisma.serviceCategory.findUniqueOrThrow({
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
        description: catalog.description ?? undefined,
        removedAt: catalog.removedAt ?? undefined,
      },
    })
  } catch (err) {
    next(err)
  }
}

export const addCategory: RequestHandler<any, ApiResponse, AddServiceCategoryRequest> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    await prisma.serviceCategory.create({
      data: req.body,
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}

export const updateCategory: RequestHandler<IdParams, ApiResponse, UpdateServiceCategoryRequest> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    await prisma.serviceCategory.update({
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

export const deleteCategory: RequestHandler<IdParams, ApiResponse> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    await prisma.serviceCategory.update({
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
