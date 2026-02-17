export interface ServiceCatalogNav {
  id: string
  label: string
}

export interface ServiceNav {
  id: string
  label: string
  amountType: 'INFINITE' | 'FINITE'
  content: boolean
  vat: number
  price: number
  forLegals: boolean
  unit?: string
}

export interface ServiceCategoryNav {
  id: string
  label: string
  description: string | null
  services: ServiceNav[]
}

export interface ServiceCatalogNavDetails {
  label: string
  banner: string | null
  description: string | null
  categories: ServiceCategoryNav[]
}

export interface ServiceNavDetails {
  label: string
  banner: string | null
  content: string | null
  priceHistory: PriceHistoryDetails[]
  statistics: number
  createdAt: Date
}

export interface PriceHistoryDetails {
  price: number
  vat: number
  createdAt: Date
}
