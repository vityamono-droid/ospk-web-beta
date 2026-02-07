export interface UnitDetails {
  id: string
  label: string
  removed: boolean
}

export interface AddUnitRequest extends Omit<UnitDetails, 'id' | 'removed'> {}

export interface UpdateUnitRequest extends Partial<AddUnitRequest & { removedAt: Date }> {}
