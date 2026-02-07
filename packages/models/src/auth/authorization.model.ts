export interface ClientRequest {
  client_id?: string
  client_name?: string
  client_secret?: string
}

export interface AuthorizeRequest extends Omit<ClientRequest, 'client_secret'> {
  response_type: 'code'
  client_id?: string
  client_name?: string
  redirect_uri: string
  scope?: string
  code_challenge: string
  code_challenge_method: 'S256'
  state?: string
}

export interface AuthorizeResponse {
  code: string
  state?: string
}

export interface AuthorizationCodeRequest extends ClientRequest {
  grant_type: 'authorization_code'
  code: string
  code_verifier: string
  redirect_uri: string
}

export interface RefreshTokenRequest extends ClientRequest {
  grant_type: 'refresh_token'
  refresh_token: string
  scope?: string
}

export interface ClientCredentialsRequest extends ClientRequest {
  grant_type: 'client_credentials'
  scope?: string
}

export interface PasswordRequest extends ClientRequest {
  grant_type: 'password'
  username: string
  password: string
  scope?: string
}

export type TokenRequest = AuthorizationCodeRequest | RefreshTokenRequest | ClientCredentialsRequest | PasswordRequest

export interface TokenResponse {
  token_type: 'Bearer'
  expires_in: number
  access_token: string
  refresh_token?: string
  scope?: string
}

export interface IntrospectTokenRequest extends ClientRequest {
  token: string
  token_type_hint?: 'access_token' | 'refresh_token'
}

interface ActiveToken {
  active: true
  scope?: string
  token_type?: IntrospectTokenRequest['token_type_hint']
  aud?: string
  iss?: string
  cid?: string
  sub?: string
  exp?: string
  iat?: string
  nbf?: string
  jti?: string
}

interface InactiveToken {
  active: false
}

export type IntrospectTokenResponse = ActiveToken | InactiveToken

export interface RevokeTokenRequest extends ClientRequest {
  token: string
  token_type_hint?: IntrospectTokenRequest['token_type_hint'] | 'auth_code'
}
