import { DateStats, PaginationQuery, Removable } from '@common'

export interface ListArticlesQuery extends PaginationQuery {
  label?: string
  catalogs?: string[]
  categories?: string[]
  disabled?: boolean
  removed?: boolean
}

export interface ArticleDetails extends Removable, DateStats {
  id: string
  label: string
  comments: number
  statics: number
}

export interface UpsertArticleDetails extends Removable {
  label: string
  content: string
  banner: string | null
  catalogId: string
  categoryId: string
}
