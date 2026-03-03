import { Removable } from '@common'

export type RequestStatus = 'PENDING' | 'REJECTED' | 'FULFILLED'

export interface RequestDetails extends Omit<Removable, 'disabled'> {
  id: string
  label: string
  status: RequestStatus
  comments: number
  statistics: number
}

export interface UpsertRequestDetails extends Omit<Removable, 'disabled'> {
  label: string
  status: RequestStatus
  categoryId: string
}

export interface CategoryDetails extends Removable {
  id: string
  label: string
  posts: number
}

export interface UpsertCategoryDetails extends Omit<CategoryDetails, 'id' | 'posts'> {}

export interface RequestDataShort {
  id: string
  label: string
  status: RequestStatus
  comments: number
  statistics: number
}

export interface RequestData {
  label: string
  content: string
  status: RequestStatus
  category: string
  profileId: string
  fullName: string
  avatar: string | null
  statistics: number
}

export interface UpsertRequestData extends Omit<Removable, 'disabled'> {
  label: string
  content: string
  status: RequestStatus
  profileId: string
  categoryId: string
}

export interface CategoryData {
  id: string
  label: string
}
