import { defineConfig } from 'prisma/config'
import config from './src/config'

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

export default defineConfig({
  schema: './prisma',
  migrations: {
    path: './prisma/migrations',
    seed: 'tsx ./prisma/seed/index.ts',
  },
  datasource: {
    url: generateDatasourceUrl(),
  },
})
