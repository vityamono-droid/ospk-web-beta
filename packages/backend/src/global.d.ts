import { AuthorizationServer } from '@jmondi/oauth2-server'
import { Logger, LoggerOptions } from 'winston'
import { Hasher } from '@plugins/security/hash.plugin'
import User from '@models/User'
import instance from '@ospk/web-database'

declare global {
  namespace NodeJS {
    interface Process {
      loggerConfig: LoggerOptions
    }

    interface ProcessEnv {
      MODE: 'DEV' | 'PROD'
    }
  }

  namespace Express {
    interface Locals {
      auth: AuthorizationServer
      prisma: typeof instance
      hasher: Hasher
      logger: Logger
    }
  }
}

module 'express-session' {
  interface SessionData {
    userId: string
    user: User
    scopeConsent: boolean
  }
}

export {}
