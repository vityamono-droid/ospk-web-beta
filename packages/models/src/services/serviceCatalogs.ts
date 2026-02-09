import { DateStats, Removable } from '@common'

export interface CatalogDetails extends Removable, DateStats {
  id: string
  label: string
  services: number
  categories: number
}

export interface UpsertCatalogDetails extends Removable {
  label: string
  banner: string | null
  description: string | null
}
