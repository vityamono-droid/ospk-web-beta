import { DateInterval, generateRandomToken, type OAuthAuthCodeRepository } from '@jmondi/oauth2-server'
import Client from '@models/Client'
import Code from '@models/Code'
import Scope from '@models/Scope'
import User from '@models/User'
import instance from '@ospk/web-database'

class CodeRepository implements OAuthAuthCodeRepository {
  async getByIdentifier(code: string): Promise<Code> {
    const found = await instance.code.findUniqueOrThrow({
      where: { code: code },
      include: {
        client: true,
      },
    })

    return new Code(found)
  }

  async issueAuthCode(client: Client, user: User | undefined, scopes: Scope[]): Promise<Code> {
    return new Code({
      code: generateRandomToken(),
      codeChallenge: null,
      codeChallengeMethod: 'plain',
      redirectUri: null,
      clientId: client.id,
      client: client,
      userId: user?.id ?? null,
      user: user,
      scopes: scopes,
      expiresAt: new DateInterval('15m').getEndDate(),
      createdAt: new Date(),
      updatedAt: null,
    })
  }

  async persist({ user, client, scopes, ...code }: Code): Promise<void> {
    await instance.code.create({
      data: {
        ...code,
        scopes: {
          connect: scopes,
        },
      },
    })
  }

  async isRevoked(code: string): Promise<boolean> {
    const found = await instance.code.findUniqueOrThrow({ where: { code: code } })
    return Date.now() > found.expiresAt.getTime()
  }

  async revoke(code: string): Promise<void> {
    await instance.code.update({
      where: { code: code },
      data: {
        expiresAt: new Date(0),
      },
    })
  }
}

export default CodeRepository
