export interface ServiceCatalog {
  id: string
  label: string
  disabled: boolean
  services: number
  categories: number
  removed: boolean
  removedAt?: Date
}

export interface ServiceCatalogDetails extends Omit<ServiceCatalog, 'services' | 'categories' | 'removed'> {
  banner?: string
  description?: string
}

export interface AddServiceCatalogRequest extends Omit<ServiceCatalogDetails, 'id' | 'removedAt'> {}

export interface UpdateServiceCatalogRequest extends Partial<Omit<ServiceCatalogDetails, 'id' | 'removedAt'>> {
  removedAt?: Date | null
}
