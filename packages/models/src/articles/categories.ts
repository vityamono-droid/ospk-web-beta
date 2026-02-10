import { ActiveOnlyQuery, DateStats, Removable } from '@common'

export interface ListCategoryDetailsQuery extends ActiveOnlyQuery {
  catalogId?: string
}

export interface ArticleCategoryDetails extends Removable, DateStats {
  id: string
  label: string
  news: number
  categories: number
  parentId: string | null
}

export interface UpsertArticleCategoryDetails extends Removable {
  label: string
  catalogId: string
  parentId: string | null
}
