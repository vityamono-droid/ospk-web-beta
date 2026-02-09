import { RequestHandler } from 'express'

import { ApiResponse } from '@ospk/web-models'
import { CategoryDetails, ListCategoryDetailsQuery, UpsertCategoryDetails } from '@ospk/web-models/articles'

// GET /api/v1/admin/articles/categories
type ListCategoriesRequest = RequestHandler<any, ApiResponse<CategoryDetails[]>, any, ListCategoryDetailsQuery>
export const listCategories: ListCategoriesRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const categories = await prisma.newsCategory.findMany({
      where: req.query.activeOnly
        ? {
            disabled: false,
            removedAt: null,
            catalogId: req.query.catalogId,
          }
        : undefined,
      omit: { catalogId: true },
      include: {
        _count: {
          select: { news: true, categories: true },
        },
      },
    })

    res.json({
      error: false,
      data: categories.map((item) => ({
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

// GET /api/v1/admin/articles/categories/:id
type GetCategoryRequest = RequestHandler<IdParams, ApiResponse<UpsertCategoryDetails>>
export const getCategory: GetCategoryRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const category = await prisma.newsCategory.findUniqueOrThrow({
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

// POST:PUT /api/v1/admin/articles/categories/:id?
type UpsertCategoryRequest = RequestHandler<IdParams, ApiResponse, UpsertCategoryDetails>
export const upsertCategory: UpsertCategoryRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    if (!!req.params.id) {
      await prisma.newsCategory.update({
        where: { id: req.params.id },
        data: req.body,
      })
    } else {
      await prisma.newsCategory.create({
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

// DELETE /api/v1/admin/articles/categories/:id
type DeleteCategoryRequest = RequestHandler<IdParams, ApiResponse>
export const deleteCategory: DeleteCategoryRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const category = await prisma.newsCategory.findUniqueOrThrow({
      where: { id: req.params.id },
      select: { removedAt: true },
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
