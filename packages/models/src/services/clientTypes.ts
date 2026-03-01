export interface CatalogData {
  id: string
  label: string
}

export interface ServiceData {
  id: string
  label: string
  amountType: 'INFINITE' | 'FINITE'
  vat: number
  price: number
  forLegals: boolean
  unit?: string
}

export interface CategoryData {
  id: string
  label: string
  description: string | null
  services: ServiceData[]
}

export interface CatalogDataDetails {
  label: string
  banner: string | null
  description: string | null
  categories: CategoryData[]
}

export interface ServiceDataDetails {
  label: string
  banner: string | null
  content: string | null
  amountType: 'INFINITE' | 'FINITE'
  price: number
  forLegals: boolean
  unit?: string
  catalog: string
  category?: string
  priceHistory: PriceHistoryData[]
  statistics: number
  createdAt: Date
}

export interface PriceHistoryData {
  price: number
  vat: number
  createdAt: Date
}
