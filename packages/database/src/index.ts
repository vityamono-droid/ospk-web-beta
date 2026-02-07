import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from './generated/client'
import config from './config'

const generateDatasourceUrl = () => {
  const user = config.username
  const pass = config.password
  const ctlg = config.catalog
  const host = config.host
  const port = config.port

  if ([user, pass, ctlg, port].some((item) => !item)) {
    throw new Error('Error extracting env variables: missing variables.')
  }

  return `postgresql://${user}:${pass}@${host ?? 'localhost'}:${port}/${ctlg}`
}

const adapter = new PrismaPg({
  connectionString: generateDatasourceUrl(),
})

const instance = new PrismaClient({
  adapter: adapter,
  log: [
    {
      emit: 'event',
      level: 'error',
    },
    {
      emit: 'event',
      level: 'info',
    },
    {
      emit: 'event',
      level: 'query',
    },
  ],
})

export type * from './generated/models'
export type * from './generated/enums'
export { PrismaClientKnownRequestError } from './generated/internal/prismaNamespace'

export default instance
