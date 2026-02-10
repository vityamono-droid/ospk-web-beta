import { PaginationQuery } from '@common'

// Catalog

export interface CatalogItem {
  id: string
  label: string
}

export interface CatalogData {
  label: string
  banner: string | null
  description: string | null
}

// Category

export interface ListCategoryItemsQuery {
  catalogId: string
}

export interface CategoryItem {
  id: string
  label: string
}

// Article

export interface ListListArticlesItemsQuery extends PaginationQuery {
  catalogId?: string
}

export interface ArticleItem {
  id: string
  label: string
  banner: string | null
  description: string | null
  categories: CategoryItem[]
  createdAt: Date
  statistics: number
}

export interface ArticleData {
  label: string
  content: string
  banner: string | null
  createdAt: Date
  statistics: number
  categories: CategoryItem[]
}
