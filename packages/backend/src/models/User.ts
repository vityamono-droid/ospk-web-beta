import type { UserModel } from '@ospk/web-database'
import type { OAuthUser } from '@jmondi/oauth2-server'

class User implements UserModel, OAuthUser {
  readonly id: string
  email: string
  password: string
  phone: string
  avatar: string | null

  firstName: string
  lastName: string
  patronymic: string | null

  lastLoginAt: Date | null
  createdAt: Date
  updatedAt: Date | null
  removedAt: Date | null

  profileId: string | null

  constructor(entity: UserModel) {
    this.id = entity.id
    this.email = entity.email
    this.password = entity.password
    this.phone = entity.phone
    this.avatar = entity.avatar

    this.firstName = entity.firstName
    this.lastName = entity.lastName
    this.patronymic = entity.patronymic

    this.lastLoginAt = entity.lastLoginAt
    this.createdAt = entity.createdAt
    this.updatedAt = entity.updatedAt
    this.removedAt = entity.removedAt

    this.profileId = entity.profileId
  }
}

export default User
