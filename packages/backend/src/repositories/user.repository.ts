import type { GrantType } from '@ospk/web-database/'
import type { OAuthUserRepository } from '@jmondi/oauth2-server'
import Client from '@models/Client'
import User from '@models/User'
import instance from '@ospk/web-database'

class UserRepository implements OAuthUserRepository {
  public async getUserByCredentials(
    identifier: string,
    _password?: string,
    _grantType?: GrantType,
    _client?: Client
  ): Promise<User> {
    const user = await instance.user.findFirstOrThrow({
      where: { id: identifier, removedAt: null },
    })

    return new User(user)
  }
}

export default UserRepository
