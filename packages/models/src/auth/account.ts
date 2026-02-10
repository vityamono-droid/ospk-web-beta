import { DateStats } from '@common'

export interface AccountData extends DateStats {
  firstName: string
  lastName: string
  patronymic: string | null
  email: string
  phone: string
  avatar: string | null
  roles: string[]
  profileId: string
}
