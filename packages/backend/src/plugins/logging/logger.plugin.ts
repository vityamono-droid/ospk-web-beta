import winston from 'winston'

const useLogger = (context: string = 'LOG') => {
  const config = loadConfig()

  return winston.loggers.add(context.toUpperCase(), {
    ...config,
    defaultMeta: { context: context.toUpperCase() },
  })
}

const loadConfig = (): winston.LoggerOptions => {
  if (process.loggerConfig) {
    return process.loggerConfig
  }

  const { align, colorize, combine, json, printf, splat, timestamp } = winston.format
  const level = process.env.NODE_ENV === 'production' ? 'info' : 'silly'
  const timestampFormat = timestamp({ format: 'YYYY-MM-DD hh:mm:ss A' })
  const consoleFormat = combine(
    colorize({
      all: false,
      colors: {
        error: 'bold inverse red',
        warn: 'bold yellow',
        http: 'bold inverse blue',
        data: 'bold inverse yellow',
        info: 'bold green',
        debug: 'blue',
        silly: 'magenta',
      },
    }),
    timestampFormat,
    align(),
    splat(),
    printf((info) => `[${info.context} @ ${info.timestamp}] ${info.level} ${info.message}`)
  )
  const fileFormat = combine(timestampFormat, splat(), json())

  process.loggerConfig = {
    levels: {
      error: 0,
      warn: 1,
      http: 2,
      data: 3,
      info: 4,
      debug: 5,
      silly: 6,
    },
    transports: [
      new winston.transports.Console({ level: level, format: consoleFormat }),
      new winston.transports.File({ filename: 'logs/error.log', level: 'error', format: fileFormat }),
      new winston.transports.File({ filename: 'logs/combined.log', level: 'debug', format: fileFormat }),
    ],
  }

  return process.loggerConfig
}

export default useLogger
