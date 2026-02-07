import { DateInterval, generateRandomToken, type OAuthTokenRepository } from '@jmondi/oauth2-server'
import Client from '@models/Client'
import Scope from '@models/Scope'
import Token from '@models/Token'
import User from '@models/User'
import instance from '@ospk/web-database'

class TokenRepository implements OAuthTokenRepository {
  public async issueToken(client: Client, scopes: Scope[], user?: User | null): Promise<Token> {
    return new Token({
      accessToken: generateRandomToken(),
      accessTokenExpiresAt: new DateInterval('1h').getEndDate(),
      refreshToken: null,
      refreshTokenExpiresAt: null,
      clientId: client.id,
      client: client,
      userId: user?.id ?? null,
      user: user ?? null,
      scopes: scopes,
      createdAt: new Date(),
      updatedAt: null,
    })
  }

  public async issueRefreshToken(token: Token, _client: Client): Promise<Token> {
    token.refreshToken = generateRandomToken()
    token.refreshTokenExpiresAt = new DateInterval('60d').getEndDate()

    await instance.token.update({
      where: { accessToken: token.accessToken },
      data: {
        refreshToken: token.refreshToken,
        refreshTokenExpiresAt: token.refreshTokenExpiresAt,
      },
    })

    return token
  }

  public async persist({ user, client, scopes, originatingAuthCodeId, ...token }: Token): Promise<void> {
    await instance.token.upsert({
      where: { accessToken: token.accessToken },
      update: {},
      create: {
        ...token,
        scopes: {
          connect: scopes,
        },
      },
    })
  }

  public async revoke({ user, client, scopes, ...token }: Token): Promise<void> {
    token.accessTokenExpiresAt = new Date(0)
    token.refreshTokenExpiresAt = new Date(0)

    await instance.token.update({
      where: { accessToken: token.accessToken },
      data: token,
    })
  }

  public async isRefreshTokenRevoked(refreshToken: Token): Promise<boolean> {
    return Date.now() > (refreshToken.refreshTokenExpiresAt?.getTime() ?? 0)
  }

  public async getByRefreshToken(refreshToken: string): Promise<Token> {
    const token = await instance.token.findUniqueOrThrow({
      where: { refreshToken: refreshToken },
      include: {
        user: true,
        client: true,
        scopes: true,
      },
    })

    return new Token(token)
  }

  public async getByAccessToken(accessToken: string): Promise<Token> {
    const token = await instance.token.findUniqueOrThrow({
      where: { accessToken: accessToken },
      include: {
        user: true,
        client: true,
        scopes: true,
      },
    })

    return new Token(token)
  }
}

export default TokenRepository
