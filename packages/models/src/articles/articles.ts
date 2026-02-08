import { PaginationRequest } from '@common'

export interface ListArticlesQuery extends PaginationRequest {
  label?: string
  catalogs?: string[]
  categories?: string[]
  disabled?: boolean
  removed?: boolean
}

export interface Article {
  id: string
  label: string
  disabled: boolean
  comments: number
  statics: number
  createdAt: Date
  removedAt: Date | null
}

export interface UpsertArticle {
  catalogId: string
  categoryId: string
  label: string
  content: string
  banner: string | null
  disabled: boolean
  removedAt: Date | null
}
