export interface ServiceCategory {
  id: string
  label: string
  disabled: boolean
  services: number
  removed: boolean
  removedAt?: Date
}

export interface ServiceCategoryDetails extends Omit<ServiceCategory, 'services' | 'removed'> {
  description?: string
  catalogId: string
}

export interface AddServiceCategoryRequest extends Omit<ServiceCategoryDetails, 'id' | 'removedAt'> {}

export interface UpdateServiceCategoryRequest extends Partial<Omit<ServiceCategoryDetails, 'id' | 'removedAt'>> {
  removedAt?: Date | null
}
