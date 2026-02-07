import type { ClientModel, ScopeModel, TokenModel, UserModel } from '@ospk/web-database'
import type { OAuthClient, OAuthToken } from '@jmondi/oauth2-server'
import Client from './Client'
import User from './User'
import Scope from './Scope'

type Relations = Partial<{
  user: UserModel | null
  scopes: ScopeModel[]
}>

type Required = {
  client: ClientModel
}

class Token implements TokenModel, OAuthToken {
  accessToken: string
  refreshToken: string | null

  clientId: string
  client: OAuthClient
  user: User | null
  userId: string | null

  accessTokenExpiresAt: Date
  refreshTokenExpiresAt: Date | null
  createdAt: Date
  updatedAt: Date | null

  scopes: ScopeModel[]

  originatingAuthCodeId?: string | undefined

  constructor({ client, user, scopes, ...entity }: TokenModel & Required & Relations) {
    this.accessToken = entity.accessToken
    this.refreshToken = entity.refreshToken

    this.clientId = entity.clientId
    this.client = new Client(client)
    this.userId = entity.userId
    this.user = user ? new User(user) : null

    this.accessTokenExpiresAt = entity.accessTokenExpiresAt
    this.refreshTokenExpiresAt = entity.refreshTokenExpiresAt
    this.createdAt = entity.createdAt
    this.updatedAt = entity.updatedAt

    this.scopes = scopes?.map((item) => new Scope(item)) ?? []
  }
}

export default Token
