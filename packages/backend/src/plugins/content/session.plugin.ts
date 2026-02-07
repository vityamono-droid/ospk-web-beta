import config from '@config'
import session from 'express-session'

const useSession = session({
  secret: config.secrets.cookie_secret,
  name: 'gg.apps',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: process.env.MODE === 'PROD',
    httpOnly: true,
    signed: true,
    maxAge: 5184000000 // 60 days
  },
})

export default useSession
