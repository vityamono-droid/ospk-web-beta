import { Removable } from '@common'

export interface UnitDetails extends Omit<Removable, 'disabled'> {
  id: string
  label: string
}

export interface UpsertUnitDetails extends Omit<UnitDetails, 'id'> {
  label: string
}
