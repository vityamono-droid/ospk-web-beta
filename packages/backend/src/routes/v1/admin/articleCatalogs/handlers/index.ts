import { RequestHandler } from 'express'
import { ApiResponse } from '@ospk/web-models'
import { ArticleCatalog, ListArticlesCatalogQuery, UpsertArticleCatalog } from '@ospk/web-models/articles'

export const listArticleCatalogs: RequestHandler<any, ApiResponse<ArticleCatalog[]>, any, ListArticlesCatalogQuery> = async (
  req,
  res,
  next,
) => {
  try {
    const prisma = res.locals.prisma

    const { limit, offset } = req.query

    const catalogs = await prisma.newsCatalog.findMany({
      where: req.query.activeOnly
        ? {
            disabled: false,
            removedAt: null,
          }
        : undefined,
      select: {
        id: true,
        label: true,
        disabled: true,
        _count: {
          select: {
            news: true,
            categories: true,
          },
        },
        removedAt: true,
      },
      take: typeof limit === 'undefined' ? undefined : +limit,
      skip: typeof offset === 'undefined' ? undefined : +offset,
    })

    res.json({
      error: false,
      data: catalogs.map((item) => ({
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

export const getArticleCatalog: RequestHandler<IdParams, ApiResponse<UpsertArticleCatalog>> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalog = await prisma.newsCatalog.findUniqueOrThrow({
      where: { id: req.params.id },
      select: {
        label: true,
        banner: true,
        description: true,
        disabled: true,
        removedAt: true,
      },
    })

    res.json({
      error: false,
      data: catalog,
    })
  } catch (err) {
    next(err)
  }
}

export const upsertArticleCatalog: RequestHandler<IdParams, ApiResponse, UpsertArticleCatalog> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    if (!!req.params.id) {
      await prisma.newsCatalog.upsert({
        where: { id: req.params.id },
        create: req.body,
        update: req.body,
      })
    } else {
      await prisma.newsCatalog.create({
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

export const deleteArticleCatalog: RequestHandler<IdParams, ApiResponse> = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const oldValue = await prisma.newsCatalog.findUniqueOrThrow({
      where: { id: req.params.id },
      select: { removedAt: true },
    })

    await prisma.newsCatalog.update({
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
