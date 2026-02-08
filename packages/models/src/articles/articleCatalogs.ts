import { PaginationRequest } from '@common'

export interface ListArticlesCatalogQuery extends Partial<PaginationRequest> {
  activeOnly?: boolean
}

export interface ArticleCatalog {
  id: string
  label: string
  disabled: boolean
  news: number
  categories: number
  removedAt: Date | null
}

export interface UpsertArticleCatalog {
  label: string
  banner: string | null
  description: string | null
  disabled: boolean
  removedAt: Date | null
}
