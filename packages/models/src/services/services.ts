import { PaginationRequest } from '@common'

export interface ListServicesRequest extends PaginationRequest {
  label?: string
  catalogs?: string[]
  categories?: string[]
  departments?: string[]
  forLegals?: boolean
  disabled?: boolean
}

export interface Service {
  id: string
  label: string
  vat: number
  price: number
  unit?: string
  comments: number
  forLegals: boolean
  disabled: boolean
  amountType: 'FINITE' | 'INFINITE'
  removed: boolean
  removedAt?: Date
}

export interface DepartmentDetails {
  available?: number
  departmentId: string
}

export interface PriceHistoryDetails {
  price: number
  vat: number
  createdAt: Date
}

export interface ServiceDetails extends Omit<Service, 'unit' | 'comments' | 'removed'> {
  banner?: string
  content?: string
  unitId?: string
  catalogId: string
  categoryId?: string
  removedAt?: Date
  departments: DepartmentDetails[]
  priceHistory: PriceHistoryDetails[]
}

export interface AddServiceRequest extends Omit<ServiceDetails, 'id' | 'priceHistory' | 'removedAt'> {}

export interface UpdateServiceRequest extends Partial<Omit<ServiceDetails, 'id' | 'priceHistory' | 'removedAt'>> {
  removedAt?: Date | null
}

export enum BULK_ACTIONS {
  STATUS,
  DELETE,
}

export interface UpdateServiceListRequest {
  action: BULK_ACTIONS
  ids: string[]
  status?: boolean
}
