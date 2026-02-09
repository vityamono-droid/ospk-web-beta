export interface ApiResponse<T = any> {
  error: boolean
  message?: string
  data?: T
}

export interface PaginationQuery {
  limit: number
  offset: number
}

export interface ActiveOnlyQuery {
  activeOnly?: boolean
}

export interface Removable {
  disabled: boolean
  removedAt: Date | null
}

export interface DateStats {
  createdAt: Date
  updatedAt: Date | null
}
