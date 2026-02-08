import { ApiResponse } from '@ospk/web-models'
import {
  ArticleCatalogNav,
  ArticleCatalogNavDetails,
  ArticleNav,
  ArticleNavDetails,
  ListArticleNavQuery,
} from '@ospk/web-models/articles'
import { RequestHandler } from 'express'

export const listArticle: RequestHandler<any, ApiResponse<ArticleNav[]>, any, ListArticleNavQuery> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const articles = await prisma.news.findMany({
      where: {
        categoryId: req.query.categoryId,
      },
      select: {
        id: true,
        label: true,
        createdAt: true,
        _count: {
          select: {
            statistics: true,
          },
        },
      },
      skip: !!req.query.offset ? +req.query.offset : undefined,
      take: !!req.query.limit ? +req.query.limit : undefined,
    })

    res.json({
      error: false,
      data: articles.map((item) => ({
        ...item,
        _count: undefined,
        statistics: item._count.statistics,
      })),
    })
  } catch (err) {
    next(err)
  }
}

export const ListCatalogs: RequestHandler<IdParams, ApiResponse<ArticleCatalogNav[]>> = async (req, res, next) => {
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
      }
    })

    res.json({
      error: false,
      data: catalogs
    })
  } catch (err) {
    next(err)
  }
}

export const getCatalog: RequestHandler<IdParams, ApiResponse<ArticleCatalogNavDetails>> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalog = await prisma.newsCatalog.findUniqueOrThrow({
      where: {
        id: req.params.id,
        disabled: false,
        removedAt: null,
      },
      select: {
        id: true,
        label: true,
        banner: true,
        description: true,
      },
    })

    res.json({
      error: false,
      data: catalog
    })
  } catch (err) {
    next(err)
  }
}

export const getArticle: RequestHandler<IdParams, ApiResponse<ArticleNavDetails>> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const article = await prisma.news.findUniqueOrThrow({
      where: {
        id: req.params.id,
        disabled: false,
        removedAt: null,
      },
      select: {
        id: true,
        label: true,
        content: true,
        banner: true,
        _count: {
          select: {
            statistics: true,
          },
        },
        categoryId: true,
        createdAt: true,
      },
    })

    res.json({
      error: false,
      data: {
        ...article,
        _count: undefined,
        statistics: article._count.statistics,
        categories: [] as string[],
      },
    })
  } catch (err) {
    next(err)
  }
}
