
class ApiError extends Error {
  public readonly status: number
  public readonly translation?: string

  constructor(status: number, message: string) {
    super(message)

    this.status = status
  }

  public static unauthenticated() {
    return new ApiError(401, 'Unauthenticated')
  }

  public static notFound() {
    return new ApiError(404, 'Resource not found')
  }

  public static notImplemented() {
    return new ApiError(501, 'Function not implemented')
  }

  public static missingCredentials() {
    return new ApiError(400, 'Missing credentials')
  }

  public static invalidCredentials() {
    return new ApiError(400, 'Invalid username or password')
  }

  public static credentialsTaken() {
    return new ApiError(400, 'Username or password already taken')
  }

  public static emailNotFound() {
    return new ApiError(400, 'Account with given Email address not found')
  }
}

export default ApiError
