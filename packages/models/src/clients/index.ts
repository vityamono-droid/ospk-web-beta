import { PaginationRequest } from '@common';

export interface ListRequest extends PaginationRequest {
  label?: string
  catalogs?: string[]
  categories?: string[]
  forLegals?: boolean
  disabled?: boolean
}
