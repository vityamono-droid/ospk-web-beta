import { DateStats, PaginationQuery, Removable } from '@common'

export interface ListServiceDetailsQuery extends PaginationQuery {
  label?: string
  catalogs?: string[]
  categories?: string[]
  departments?: string[]
  forLegals?: boolean
  disabled?: boolean
}

export interface ServiceDetails extends Removable, DateStats {
  id: string
  label: string
  vat: number
  price: number
  unit?: string
  amountType: 'FINITE' | 'INFINITE'
  forLegals: boolean
  comments: number
  statistics: number
}

export interface DepartmentDetails {
  available: number | null
  departmentId: string
}

export interface UpsertServiceDetails extends Removable {
  label: string
  banner: string | null
  content: string | null
  vat: number
  price: number
  amountType: 'FINITE' | 'INFINITE'
  forLegals: boolean
  unitId: string | null
  catalogId: string
  categoryId: string | null
  departments: DepartmentDetails[]
}

export enum BULK_ACTIONS {
  STATUS,
  DELETE,
}

export interface ServiceDetailsAction {
  action: BULK_ACTIONS
  ids: string[]
  status?: boolean
}
