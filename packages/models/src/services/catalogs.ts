import { DateStats, Removable } from '@common'

export interface ServiceCatalogDetails extends Removable, DateStats {
  id: string
  label: string
  services: number
  categories: number
}

export interface UpsertServiceCatalogDetails extends Removable {
  label: string
  banner: string | null
  description: string | null
}
