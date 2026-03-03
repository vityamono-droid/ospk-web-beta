import { ApiResponse } from '@ospk/web-models'
import { CategoryDetails, RequestDetails, UpsertCategoryDetails } from '@ospk/web-models/requests'
import { RequestHandler } from 'express'

// GET /api/v1/admin/requests/categories
type ListCategoriesRequest = RequestHandler<any, ApiResponse<CategoryDetails[]>>
export const listCategories: ListCategoriesRequest = async (_req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const categories = await prisma.forumPostCategory.findMany({
      select: {
        id: true,
        label: true,
        disabled: true,
        removedAt: true,
        _count: {
          select: {
            posts: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    res.json({
      error: false,
      data: categories.map((item) => ({
        ...item,
        _count: undefined,
        posts: item._count.posts,
      })),
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/admin/requests/categories/:id
type GetCategoryRequest = RequestHandler<any, ApiResponse<UpsertCategoryDetails>>
export const getCategory: GetCategoryRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const category = await prisma.forumPostCategory.findUniqueOrThrow({
      where: { id: req.params.id },
      select: {
        label: true,
        disabled: true,
        removedAt: true,
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

// PUT|POST /api/v1/admin/requests/categories/:id?
type UpsertCategoryRequest = RequestHandler<any, ApiResponse<string>, UpsertCategoryDetails>
export const upsertCategory: UpsertCategoryRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    let upserted
    if (!!req.params.id) {
      upserted = await prisma.forumPostCategory.update({
        where: { id: req.params.id },
        data: req.body,
        select: { id: true },
      })
    } else {
      upserted = await prisma.forumPostCategory.create({
        data: req.body,
        select: { id: true },
      })
    }

    res.json({
      error: false,
      data: upserted.id,
    })
  } catch (err) {
    next(err)
  }
}

// DELETE /api/v1/admin/requests/categories/:id
type DeleteCategoryRequest = RequestHandler<any, ApiResponse>
export const deleteCategory: DeleteCategoryRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const category = await prisma.forumPostCategory.findUniqueOrThrow({
      where: { id: req.params.id },
      select: { removedAt: true },
    })

    await prisma.forumPostCategory.update({
      where: { id: req.params.id },
      data: { removedAt: !!category.removedAt ? null : new Date() },
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/admin/requests
type ListRequestsRequest = RequestHandler<any, ApiResponse<RequestDetails[]>>
export const listRequests: ListRequestsRequest = async (_req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const requests = await prisma.forumPost.findMany({
      select: {
        id: true,
        label: true,
        status: true,
        removedAt: true,
        _count: {
          select: {
            comments: true,
            statistics: true,
          },
        },
      },
    })

    res.json({
      error: false,
      data: requests.map((item) => ({
        ...item,
        _count: undefined,
        comments: item._count.comments,
        statistics: item._count.statistics,
      })),
    })
  } catch (err) {
    next(err)
  }
}
