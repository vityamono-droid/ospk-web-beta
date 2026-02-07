import type { OAuthScope } from '@jmondi/oauth2-server'
import type { ScopeModel } from '@ospk/web-database'

class Scope implements ScopeModel, OAuthScope {
  readonly id: string
  name: string
  label: string | null
  clientId: string
  createdAt: Date
  updatedAt: Date | null

  constructor(entity: ScopeModel) {
    this.id = entity.id
    this.name = entity.name
    this.label = entity.label
    this.clientId = entity.clientId
    this.createdAt = entity.createdAt
    this.updatedAt = entity.updatedAt
  }
}

export default Scope
