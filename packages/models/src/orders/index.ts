export type OrderStatus = 'PENDING' | 'READY' | 'FULFILLED' | 'REJECTED'

export interface OrderDetails {
  id: string
  label: string
  department: string
  amount: number | null
  price: number
  createdAt: Date
}

export interface OrderData {
  label: string
  banner: string | null
  department: string
  amount: number | null
  price: number
  status: OrderStatus
  serviceId: string
  createdAt: Date
}

export interface UpsertOrderData {
  serviceId: string
  departmentId: string
  amount: number | null
}
