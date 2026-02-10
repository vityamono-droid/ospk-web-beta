import { RequestHandler } from 'express'
import type { ActiveOnlyQuery, ApiResponse } from '@ospk/web-models'
import type { ServiceCategoryDetails, UpsertServiceCategoryDetails } from '@ospk/web-models/services'

// GET /api/v1/admin/services/categories
type ListCategoriesRequest = RequestHandler<any, ApiResponse<ServiceCategoryDetails[]>, any, ActiveOnlyQuery>
export const listCategories: ListCategoriesRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const categories = await prisma.serviceCategory.findMany({
      where: !!req.query.activeOnly
        ? {
            disabled: false,
            removedAt: null,
          }
        : undefined,
      omit: {
        description: true,
      },
      include: {
        _count: {
          select: { services: true },
        },
      },
    })

    res.json({
      error: false,
      data: categories.map((item) => ({
        ...item,
        _count: undefined,
        services: item._count.services,
      })),
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/admin/services/categories/:id
type GetCategoryRequest = RequestHandler<IdParams, ApiResponse<UpsertServiceCategoryDetails>>
export const getCategory: GetCategoryRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const category = await prisma.serviceCategory.findUniqueOrThrow({
      where: { id: req.params.id },
      omit: {
        id: true,
        createdAt: true,
        updatedAt: true,
      },
    })

    res.json({
      error: false,
      data: category,
    })
  } catch (err) {
    next(err)
  }
}

// POST:PUT /api/v1/admin/services/categories/:id?
type UpsertCategoryRequest = RequestHandler<any, ApiResponse, UpsertServiceCategoryDetails>
export const upsertCategory: UpsertCategoryRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    if (!!req.params.id) {
      await prisma.serviceCategory.update({
        where: { id: req.params.id },
        data: req.body,
      })
    } else {
      await prisma.serviceCategory.create({
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

// DELETE /api/v1/admin/services/categories/:id
type DeleteCategoryRequest = RequestHandler<IdParams, ApiResponse>
export const deleteCategory: DeleteCategoryRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const category = await prisma.newsCategory.findUniqueOrThrow({
      where: { id: req.params.id },
    })

    await prisma.newsCategory.update({
      where: { id: req.params.id },
      data: {
        removedAt: !!category.removedAt ? null : new Date(),
      },
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}
