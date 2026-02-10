import { RequestHandler } from 'express'

import { ApiResponse } from '@ospk/web-models'
import { ArticleData, ArticleItem, CategoryItem, ListListArticlesItemsQuery } from '@ospk/web-models/articles'

// GET /api/v1/articles
type ListArticlesRequest = RequestHandler<any, ApiResponse<ArticleItem[]>, any, ListListArticlesItemsQuery>
export const listArticles: ListArticlesRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const categories = await prisma.news.findMany({
      where: {
        catalogId: req.query.catalogId,
        disabled: false,
        removedAt: null,
      },
      select: {
        id: true,
        label: true,
        banner: true,
        description: true,
        createdAt: true,
        categoryId: true,
        _count: {
          select: {
            statistics: true,
          },
        },
      },
      take: +req.query.limit,
      skip: +req.query.offset,
    })

    const itemCategories: { [key: string]: CategoryItem[] } = {}
    for (const category of categories) {
      itemCategories[category.id] = !!category.categoryId
        ? await prisma.$queryRaw`
        with recursive cte_news_categories as (
          select nc.id, nc.label, nc."parentId"
          from "NewsCategory" nc
          where nc.id = ${category.categoryId}

          union all

          select ncr.id, ncr.label, ncr."parentId"
          from "NewsCategory" ncr
          join cte_news_categories as cte on ncr.id = cte."parentId"
        )

        select * from cte_news_categories`
        : []
    }

    res.json({
      error: false,
      data: categories.map((item) => ({
        ...item,
        _count: undefined,
        statistics: item._count.statistics,
        categories: itemCategories[item.id],
      })),
    })
  } catch (err) {
    next(err)
  }
}

// GET /api/v1/articles/:id
type GetArticleRequest = RequestHandler<IdParams, ApiResponse<ArticleData>>
export const getArticle: GetArticleRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const category = await prisma.news.findUniqueOrThrow({
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
        createdAt: true,
        categoryId: true,
        _count: {
          select: { statistics: true },
        },
      },
    })

    const categories: CategoryItem[] = !!category.categoryId
      ? await prisma.$queryRaw`
          with recursive cte_news_categories as (
            select nc.id, nc.label, nc."parentId"
            from "NewsCategory" nc
            where nc.id = ${category.categoryId}

            union all

            select ncr.id, ncr.label, ncr."parentId"
            from "NewsCategory" ncr
            join cte_news_categories as cte on ncr.id = cte."parentId"
          )

          select id, label from cte_news_categories`
      : []

    res.json({
      error: false,
      data: {
        ...category,
        _count: undefined,
        statistics: category._count.statistics,
        categories: categories,
      } as any,
    })
  } catch (err) {
    next(err)
  }
}
