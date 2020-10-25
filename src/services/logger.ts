import * as winston from 'winston'
import * as appRoot from 'app-root-path'
import { Request } from 'express'
import RouteError from './../shared/error'

const { combine, timestamp, printf } = winston.format
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`
})

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: `${appRoot}/logs/combined.log`,
      format: combine(timestamp(), myFormat),
      handleExceptions: true
    }),
    new winston.transports.File({
      level: 'error',
      filename: `${appRoot}/logs/errors.log`,
      format: combine(timestamp(), myFormat),
      handleExceptions: true
    })
  ],
  exitOnError: false
})

if (process.env.NODE_ENV !== 'prod') {
  logger.add(
    new winston.transports.Console({
      format: combine(winston.format.colorize(), winston.format.simple()),
      handleExceptions: true
    })
  )
}

export const routeLog = (err: RouteError, req: Request) => {
  const msg = err.message || err
  const status = err.status || 500

  return `${msg} - ${status} - ${req.originalUrl} - ${req.method} - ${req.ip}`
}

export default logger
