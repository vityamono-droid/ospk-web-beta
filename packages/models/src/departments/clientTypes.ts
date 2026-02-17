import { WeekDay } from '@departments'

interface EmployeeData {
  firstName: string
  lastName: string
  patronymic: string | null
  position: string | null
}

export interface ContactData {
  type: 'PHONE' | 'FAX'
  phone: string
  employee: EmployeeData
}

export interface ScheduleData {
  label: string
  weekDays: WeekDay[]
  timeStart: number
  timeEnd: number
}

export interface DepartmentData {
  address: string
  maps: string
  phone: string | null
  email: string | null
  contacts: ContactData[]
  schedules: ScheduleData[]
}
