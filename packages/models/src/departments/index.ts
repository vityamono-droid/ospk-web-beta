import { DateStats, PaginationQuery, Removable } from '@common'

export interface ContactDetails extends Removable {
  id: string
  phone: string
  type: 'PHONE' | 'FAX'
  employeeId: string
}

export type WeekDay = 'MONDAY' | 'TUESDAY' | 'WEDNESDAY' | 'THURSDAY' | 'FRIDAY' | 'SATURDAY' | 'SUNDAY' | 'CUSTOM'

export interface ScheduleDetails extends Omit<Removable, 'disabled'> {
  id: string
  label: string
  weekDays: WeekDay[]
  timeStart: number
  timeEnd: number
}

export interface DepartmentDetails extends Removable, DateStats {
  id: string
  address: string
  phone: string | null
  email: string | null
}

export interface UpsertDepartmentDetails extends Removable {
  address: string
  phone: string | null
  email: string | null
  contacts: ContactDetails[]
  schedules: ScheduleDetails[]
}
