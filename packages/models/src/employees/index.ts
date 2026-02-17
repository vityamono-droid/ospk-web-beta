import { Removable } from '@common'

export interface EmployeeDetails extends Removable {
  id: string
  firstName: string
  lastName: string
  patronymic: string | null
  level: 'HIGHER' | 'SECONDARY' | 'PRIMARY'
}

export interface UpsertEmployeeDetails extends Removable {
  firstName: string
  lastName: string
  patronymic: string | null
  photo: string | null
  level: 'HIGHER' | 'SECONDARY' | 'PRIMARY'
  departmentId: string
}
