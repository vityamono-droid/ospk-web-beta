import { RequestHandler } from 'express'
import { ApiResponse } from '@ospk/web-models'
import { ArticleCategory, ListArticleCategory, UpsertArticleCategory } from '@ospk/web-models/articles'

export const listArticleCategories: RequestHandler<any, ApiResponse<ArticleCategory[]>, any, ListArticleCategory> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const categories = await prisma.newsCategory.findMany({
      where: req.query.activeOnly ? {
        disabled: false,
        removedAt: null,
        catalogId: req.query.catalogId,
      } : undefined,
      select: {
        id: true,
        parentId: true,
        label: true,
        disabled: true,
        _count: {
          select: {
            news: true,
            categories: true,
          },
        },
        removedAt: true,
      }
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

export const getArticleCategory: RequestHandler<IdParams, ApiResponse<UpsertArticleCategory>> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const category = await prisma.newsCategory.findUniqueOrThrow({
      where: { id: req.params.id },
      select: {
        catalogId: true,
        parentId: true,
        label: true,
        disabled: true,
        removedAt: true,
      }
    })

    res.json({
      error: false,
      data: category,
    })
  } catch (err) {
    next(err)
  }
}

export const upsertArticleCategory: RequestHandler<IdParams, ApiResponse, UpsertArticleCategory> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    if (!!req.params.id) {
      await prisma.newsCategory.upsert({
        where: { id: req.params.id },
        create: req.body,
        update: req.body,
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

export const deleteArticleCategory: RequestHandler<IdParams, ApiResponse> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const oldValue = await prisma.newsCategory.findUniqueOrThrow({
      where: { id: req.params.id },
      select: { removedAt: true },
    })

    await prisma.newsCategory.update({
      where: { id: req.params.id },
      data: {
        removedAt: !!oldValue.removedAt ? null : new Date(),
      },
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}
