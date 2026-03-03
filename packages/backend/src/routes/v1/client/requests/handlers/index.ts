import { RequestHandler } from 'express'
import { ApiResponse } from '@ospk/web-models'
import { CategoryData, RequestData, RequestDataShort, UpsertRequestData } from '@ospk/web-models/requests'

// GET /api/v1/requests/categories
type ListCategoriesRequest = RequestHandler<any, ApiResponse<CategoryData[]>>
export const listCategories: ListCategoriesRequest = async (_req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const categories = await prisma.forumPostCategory.findMany({
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
      data: categories,
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/requests/categories/:id
type GetCategoryRequest = RequestHandler<any, ApiResponse<RequestDataShort[]>>
export const getCategory: GetCategoryRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const posts = await prisma.forumPost.findMany({
      where: { categoryId: req.params.id },
      select: {
        _count: {
          select: {
            comments: true,
            statistics: true,
          },
        },
        id: true,
        label: true,
        status: true,
      },
    })

    res.json({
      error: false,
      data: posts.map((item) => ({
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

// GET /api/v1/requests/:id
type GetRequestRequest = RequestHandler<any, ApiResponse<RequestData>>
export const getRequest: GetRequestRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const post = await prisma.forumPost.findUniqueOrThrow({
      where: { id: req.params.id },
      select: {
        label: true,
        content: true,
        status: true,
        category: {
          select: {
            label: true,
          },
        },
        profile: {
          select: {
            id: true,
            user: {
              select: {
                firstName: true,
                lastName: true,
                patronymic: true,
                avatar: true,
              },
            },
          },
        },
        _count: {
          select: {
            statistics: true,
          },
        },
      },
    })

    await prisma.statistics.create({
      data: {
        type: 'VIEW',
        postId: req.params.id,
      },
    })

    const { category, profile, _count, ...data } = post

    res.json({
      error: false,
      data: {
        ...data,
        category: category.label,
        statistics: _count.statistics,
        profileId: profile.id,
        avatar: profile.user?.avatar ?? null,
        fullName: `${profile.user?.lastName} ${profile.user?.patronymic} ${profile.user?.lastName[0]}`.trim(),
      },
    })
  } catch (err) {
    next(err)
  }
}

// POST /api/v1/requests
type UpsertRequestRequest = RequestHandler<any, ApiResponse<string>, UpsertRequestData>
export const upsertRequest: UpsertRequestRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const upserted = await prisma.forumPost.create({
      data: req.body,
      select: { id: true },
    })

    res.json({
      error: false,
      data: upserted.id,
    })
  } catch (err) {
    next(err)
  }
}
