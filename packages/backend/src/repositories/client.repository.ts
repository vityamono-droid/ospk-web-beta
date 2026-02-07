import type { GrantType } from '@ospk/web-database'
import type { OAuthClientRepository } from '@jmondi/oauth2-server'
import Client from '@models/Client'
import instance from '@ospk/web-database'

class ClientRepository implements OAuthClientRepository {
  public async getByIdentifier(clientId: string): Promise<Client> {
    const client = await instance.client.findUniqueOrThrow({
      where: { id: clientId },
      include: { connectedScopes: true, ownScopes: true },
    })

    return new Client(client)
  }

  public async isClientValid(grantType: GrantType, client: Client, clientSecret?: string): Promise<boolean> {
    return client.secret === clientSecret && client.allowedGrants.includes(grantType)
  }
}

export default ClientRepository
