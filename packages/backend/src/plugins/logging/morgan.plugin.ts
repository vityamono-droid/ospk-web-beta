import morgan from 'morgan'
import useLogger from './logger.plugin.ts'

const logger = useLogger('HTTP')

morgan.format(
  'auth',
  [
    '[:method :url HTTP/:http-version]',
    ':status :res[content-length]B',
    'r:response-time[2]ms t:total-time[2]ms',
    ":remote-addr ':referrer' ':user-agent'",
  ].join(' ')
)

const useMorgan = morgan('auth', {
  stream: {
    write: (message: string) => logger.http(message.trim()),
  },
})

export default useMorgan
