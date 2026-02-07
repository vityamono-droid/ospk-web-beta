import cookieParser from 'cookie-parser'
import config from '@config'

const useCookies = cookieParser(config.secrets.cookie_secret)

export default useCookies
