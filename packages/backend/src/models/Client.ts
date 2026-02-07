import type { GrantType, ClientModel, ScopeModel } from '@ospk/web-database'
import type { OAuthClient } from '@jmondi/oauth2-server'
import Scope from './Scope'

type Relations = {
  connectedScopes: ScopeModel[]
  ownScopes: ScopeModel[]
}

class Client implements ClientModel, OAuthClient {
  readonly id: string

  name: string
  label: string
  secret: string | null

  firstParty: boolean
  redirectUris: string[]
  allowedGrants: GrantType[]

  createdAt: Date
  updatedAt: Date | null
  removedAt: Date | null

  scopes: Scope[]

  constructor({ connectedScopes, ownScopes, ...entity }: ClientModel & Partial<Relations>) {
    this.id = entity.id

    this.name = entity.name
    this.label = entity.label
    this.secret = entity.secret

    this.firstParty = entity.firstParty
    this.redirectUris = entity.redirectUris
    this.allowedGrants = entity.allowedGrants

    this.createdAt = entity.createdAt
    this.updatedAt = entity.updatedAt
    this.removedAt = entity.removedAt

    const scopes = connectedScopes ?? []
    scopes.concat(ownScopes ?? [])

    this.scopes = scopes.map((item) => new Scope(item))
  }
}

export default Client
