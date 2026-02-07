import express from 'express'
import appRouter from '@routes'
// security
import useCors from '@plugins/security/cors.plugin'
import useHelmet from '@plugins/security/helmet.plugin'
import useAuth from '@plugins/security/auth.plugin'
import useHash from '@plugins/security/hash.plugin'
// content
import useCookies from '@plugins/content/cookies.plugin'
import useJson from '@plugins/content/json.plugin'
import useUrlencoded from '@plugins/content/urlencoded.plugin'
import useDatabase from '@plugins/content/database.plugin'
import useQueryRewrite from '@plugins/content/queryRewrite.plugin'
import useSession from '@plugins/content/session.plugin'
// logging
import useLogger from '@plugins/logging/logger.plugin'
import useLogPathName from '@plugins/logging/logPathName'
import useMorgan from '@plugins/logging/morgan.plugin'
// routing
import use404 from '@plugins/routing/404.plugin'
import useErrors from '@plugins/routing/errors.plugin'

import config from '@config'

const main = () => {
  const logger = useLogger('@')
  logger.info('Running application in %s mode...', process.env.MODE)
  const app = express()
  // security
  app.use(useCors)
  app.use(useHelmet)
  app.use(useAuth)
  app.use(useHash)
  app.enable('trust proxy')
  // content
  app.use(useCookies)
  app.use(useJson)
  app.use(useUrlencoded)
  app.use(useDatabase)
  app.use(useQueryRewrite)
  app.use(useSession)
  app.use('/static', express.static('./static'))
  // logging
  app.use(useMorgan)
  app.use(useLogPathName)
  // routing
  app.use('/api', appRouter)
  app.use(use404)
  app.use(useErrors)

  app.listen(config.app.port, config.app.host, (err) => {
    if (err) {
      logger.error('Error running application:', err)
      return
    }

    logger.info('Application running: %s:%d', config.app.host, config.app.port)
  })
}

main()
