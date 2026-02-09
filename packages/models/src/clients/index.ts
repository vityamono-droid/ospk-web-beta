import { DateStats, PaginationQuery, Removable } from '@common'

export enum CLIENT_TYPE {
  CLIENT = 'CLIENT',
  STAFF = 'STAFF',
}

export interface ListClientsQuery extends PaginationQuery {
  lastName?: string
  phone?: string
  email?: string
  disabled?: boolean
  type?: CLIENT_TYPE
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
