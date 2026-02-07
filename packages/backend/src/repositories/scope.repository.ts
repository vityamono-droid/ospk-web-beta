import type { OAuthScopeRepository } from '@jmondi/oauth2-server'
import Client from '@models/Client'
import Scope from '@models/Scope'
import instance from '@ospk/web-database'

class ScopeRepository implements OAuthScopeRepository {
  public async getAllByIdentifiers(names: string[]): Promise<Scope[]> {
    const scopes = await instance.scope.findMany({
      where: {
        name: {
          in: names,
        },
      },
    })

    return scopes.map((item) => new Scope(item))
  }

  public async finalize(scopes: Scope[], _identifier: string, _client: Client, user_id?: string): Promise<Scope[]> {
    if (user_id) {
      const user = await instance.user.findUniqueOrThrow({
        include: { roles: { include: { scopes: true } } },
        where: { id: user_id },
      })

      const roleScopes = user.roles.map((role) => role.scopes).flat()
      const uniqueScopes = roleScopes.filter((item) => !scopes.find((scope) => scope.id == item.id))
      scopes.push(...uniqueScopes)
    }

    return scopes
  }
}

export default ScopeRepository
