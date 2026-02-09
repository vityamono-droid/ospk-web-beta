import { ActiveOnlyQuery, DateStats, PaginationQuery, Removable } from '@common'

export interface ListCatalogDetailsQuery extends Partial<PaginationQuery>, ActiveOnlyQuery {}

export interface CatalogDetails extends Removable, DateStats {
  id: string
  label: string
  news: number
  categories: number
}

export interface UpsertCatalogDetails extends Removable {
  label: string
  banner: string | null
  description: string | null
}
