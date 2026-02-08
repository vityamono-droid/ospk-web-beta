import { RequestHandler } from 'express'
import { ApiResponse } from '@ospk/web-models'
import { Article, ListArticlesQuery, UpsertArticle } from '@ospk/web-models/articles'

export const listArticles: RequestHandler<any, ApiResponse<Article[]>, any, ListArticlesQuery> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma
console.log(
  typeof req.query.removed,
  typeof req.query.removed === 'string'
    ? req.query.removed == 'true'
      ? {
          not: null,
        }
      : null
    : undefined,
)
    const articles = await prisma.news.findMany({
      where: {
        label: req.query.label,
        catalogId: req.query.catalogs ? { in: req.query.catalogs } : undefined,
        categoryId: req.query.categories ? { in: req.query.categories } : undefined,
        disabled: req.query.disabled,
        removedAt:
          typeof req.query.removed === 'boolean'
            ? req.query.removed
              ? {
                  not: null,
                }
              : null
            : undefined,
      },
      select: {
        id: true,
        label: true,
        disabled: true,
        _count: {
          select: {
            comments: true,
            statistics: true,
          },
        },
        createdAt: true,
        removedAt: true,
      },
      take: +req.query.limit,
      skip: +req.query.offset,
    })

    res.json({
      error: false,
      data: articles.map((item) => ({
        ...item,
        _count: undefined,
        comments: item._count.comments,
        statics: item._count.statistics,
      })),
    })
  } catch (err) {
    next(err)
  }
}

export const getArticle: RequestHandler<IdParams, ApiResponse> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const article = await prisma.news.findUniqueOrThrow({
      where: { id: req.params.id },
      select: {
        catalogId: true,
        categoryId: true,
        label: true,
        content: true,
        banner: true,
        disabled: true,
        removedAt: true,
      },
    })

    res.json({
      error: false,
      data: article,
    })
  } catch (err) {
    next(err)
  }
}

export const upsertArticle: RequestHandler<IdParams, ApiResponse, UpsertArticle> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    if (!!req.params.id) {
      await prisma.news.upsert({
        where: { id: req.params.id },
        update: req.body,
        create: req.body,
      })
    } else {
      await prisma.news.create({
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

export const deleteArticle: RequestHandler<IdParams, ApiResponse> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const oldValue = await prisma.news.findUniqueOrThrow({
      where: { id: req.params.id },
      select: { removedAt: true },
    })

    await prisma.news.update({
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
