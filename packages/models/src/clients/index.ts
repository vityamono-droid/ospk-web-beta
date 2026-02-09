import { DateStats, PaginationQuery, Removable } from '@common'

export interface ListClientsQuery extends PaginationQuery {
  lastName?: string
  phone?: string
  email?: string
  disabled?: boolean
  type?: 'CLIENT' | 'STAFF'
}

export interface ClientDetails extends Removable, DateStats {
  avatar: string | null
  firstName: string
  lastName: string
  patronymic: string | null
  phone: string
  email: string
  roles: string[]
  lastLoginAt: Date | null
}

export interface UpsertClientDetails extends Removable {
  avatar: string | null
  firstName: string
  lastName: string
  patronymic: string | null
  phone: string
  email: string
  password?: string
  roles: string[]
  lastLoginAt: Date | null
}
