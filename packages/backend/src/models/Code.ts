import type { CodeChallengeMethod, ClientModel, CodeModel, ScopeModel, UserModel } from '@ospk/web-database'
import type { OAuthAuthCode } from '@jmondi/oauth2-server'
import Client from './Client'
import Scope from './Scope'
import User from './User'

type Optional = Partial<{
  user: UserModel
  scopes: ScopeModel[]
}>

type Required = {
  client: ClientModel
}

class Code implements CodeModel, OAuthAuthCode {
  readonly code: string
  codeChallenge: string | null
  codeChallengeMethod: CodeChallengeMethod
  redirectUri: string | null

  user: User | null
  userId: string | null
  client: Client
  clientId: string

  expiresAt: Date
  createdAt: Date
  updatedAt: Date | null

  scopes: Scope[]

  constructor({ user, client, scopes, ...entity }: CodeModel & Required & Optional) {
    this.code = entity.code
    this.codeChallenge = entity.codeChallenge
    this.codeChallengeMethod = entity.codeChallengeMethod
    this.redirectUri = entity.redirectUri

    this.user = user ? new User(user) : null
    this.userId = entity.userId
    this.client = new Client(client)
    this.clientId = entity.clientId

    this.expiresAt = entity.expiresAt
    this.createdAt = entity.createdAt
    this.updatedAt = entity.updatedAt

    this.scopes = scopes?.map((item) => new Scope(item)) ?? []
  }
}

export default Code
