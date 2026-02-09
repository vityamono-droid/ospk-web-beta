import { DateStats, Removable } from '@common'

export interface CategoryDetails extends Removable, DateStats {
  id: string
  label: string
  services: number
}

export interface UpsertCategoryDetails extends Removable {
  label: string
  description: string | null
  catalogId: string
}
