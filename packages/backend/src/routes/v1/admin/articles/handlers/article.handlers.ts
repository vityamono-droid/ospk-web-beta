import { RequestHandler } from 'express'

import { ApiResponse } from '@ospk/web-models'
import { ArticleDetails, ListArticlesQuery, UpsertArticleDetails } from '@ospk/web-models/articles'

// GET /api/v1/admin/articles
type ListArticlesRequest = RequestHandler<any, ApiResponse<ArticleDetails[]>, any, ListArticlesQuery>
export const listArticles: ListArticlesRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const { limit, offset, ...filters } = req.query

    const articles = await prisma.news.findMany({
      where: {
        label: filters.label,
        catalogId: !!filters.catalogs ? { in: filters.catalogs } : undefined,
        categoryId: !!filters.categories ? { in: filters.categories } : undefined,
        disabled: filters.disabled,
        removedAt:
          typeof filters.removed === 'boolean'
            ? filters.removed
              ? {
                  not: null,
                }
              : null
            : undefined,
      },
      omit: {
        banner: true,
        content: true,
        catalogId: true,
        categoryId: true,
      },
      include: {
        _count: {
          select: { comments: true, statistics: true },
        },
      },
      take: typeof limit === 'undefined' ? undefined : +limit,
      skip: typeof offset === 'undefined' ? undefined : +offset,
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

// GET /api/v1/admin/articles/:id
type GetArticleRequest = RequestHandler<any, ApiResponse<UpsertArticleDetails>>
export const getArticle: GetArticleRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const article = await prisma.news.findUniqueOrThrow({
      where: { id: req.params.id },
      omit: {
        id: true,
        createdAt: true,
        updatedAt: true,
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

// POST:PUT /api/v1/admin/articles/:id?
type UpsertArticleRequest = RequestHandler<any, ApiResponse, UpsertArticleDetails>
export const upsertArticle: UpsertArticleRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    if (!!req.params.id) {
      await prisma.news.update({
        where: { id: req.params.id },
        data: req.body,
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

// DELETE /api/v1/admin/articles/:id
type DeleteArticleRequest = RequestHandler<any, ApiResponse>
export const deleteArticle: DeleteArticleRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const news = await prisma.news.findUniqueOrThrow({
      where: { id: req.params.id },
      select: { removedAt: true },
    })

    await prisma.news.update({
      where: { id: req.params.id },
      data: {
        removedAt: !!news.removedAt ? null : new Date(),
      },
    })

    res.json({
      error: false,
    })
  } catch (err) {
    next(err)
  }
}
