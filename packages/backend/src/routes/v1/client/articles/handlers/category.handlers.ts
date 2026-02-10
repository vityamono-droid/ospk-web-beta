import { RequestHandler } from 'express'

import { ApiResponse } from '@ospk/web-models'
import { CategoryItem, ListCategoryItemsQuery } from '@ospk/web-models/articles'

// GET /api/v1/articles/categories
type ListCategoriesRequest = RequestHandler<any, ApiResponse<CategoryItem[]>, any, ListCategoryItemsQuery>
export const listCategories: ListCategoriesRequest = async (req, res, next) => {
  try {
    const prisma = res.locals.prisma

    const catalogs = await prisma.newsCategory.findMany({
      where: {
        catalogId: req.query.catalogId,
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
      data: catalogs,
    })
  } catch (err) {
    next(err)
  }
}
