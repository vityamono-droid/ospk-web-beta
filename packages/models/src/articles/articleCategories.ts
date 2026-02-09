import { ActiveOnlyQuery, DateStats, Removable } from '@common'

export interface ListCategoryDetailsQuery extends ActiveOnlyQuery {
  catalogId?: string
}

export interface CategoryDetails extends Removable, DateStats {
  id: string
  label: string
  news: number
  categories: number
  parentId: string | null
}

export interface UpsertCategoryDetails extends Removable {
  label: string
  catalogId: string
  parentId: string | null
}
