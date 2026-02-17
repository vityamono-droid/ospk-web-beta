import { DateStats, Removable } from '@common'

export type Placement = 'HOME' | 'SERVICES' | 'NEWS' | 'PROFILE'

export interface CarouselDetails extends Removable, DateStats {
  id: string
  label: string
  durationFrom: Date | null
  durationTo: Date | null
  placement: Placement
}

export interface UpsertCarouselDetails extends Removable {
  banner: string
  link: string | null
  label: string
  description: string | null
  durationFrom: Date | null
  durationTo: Date | null
  placement: Placement
}

export interface CarouselData {
  banner: string
  link: string | null
  label: string
  placement: Placement
}
