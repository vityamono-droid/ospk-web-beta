export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  patronymic?: string
  email: string
  phone: string
  password: string
}
