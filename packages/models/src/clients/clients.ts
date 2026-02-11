import { DateStats, PaginationQuery, Removable } from '@common'

export interface ListClientDetailsQuery extends PaginationQuery {
  type: 'CLIENT' | 'STAFF'
  lastName?: string
  phone?: string
  email?: string
}

export interface ClientDetails extends Omit<Removable, 'disabled'>, DateStats {
  id: string
  firstName: string
  lastName: string
  patronymic: string | null
  phone: string
  email: string
}

export interface UpsertClientDetails extends Omit<Removable, 'disabled'> {
  firstName: string
  lastName: string
  patronymic: string | null
  phone: string
  email: string
  password?: string
  avatar?: string | null
  roles: string[]
}
