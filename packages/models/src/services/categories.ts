import { DateStats, Removable } from '@common'

export interface ServiceCategoryDetails extends Removable, DateStats {
  id: string
  label: string
  services: number
}

export interface UpsertServiceCategoryDetails extends Removable {
  label: string
  description: string | null
  catalogId: string
}
