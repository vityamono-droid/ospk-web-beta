import { PaginationQuery } from '@common'

export interface ArticleCatalogNav {
  id: string
  label: string
}

export interface ArticleCatalogNavDetails {
  id: string
  label: string
  banner: string | null
  description: string | null
}

export interface ListArticleNavQuery extends PaginationQuery {
  categoryId: string
}

export interface ArticleNav {
  id: string
  label: string
  createdAt: Date
  statistics: number
}

export interface ArticleNavDetails {
  id: string
  label: string
  content: string
  banner: string | null
  statistics: number
  createdAt: Date
  categories: string[]
}
