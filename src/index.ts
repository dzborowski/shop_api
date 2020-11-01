import 'reflect-metadata'
import * as express from 'express'
import * as helmet from 'helmet'
import * as bodyParser from 'body-parser'
import { createConnection } from 'typeorm'
import { errors } from 'celebrate'
import routes from './routes'
import logger, { routeLog } from './services/logger'
import { Auth, authRouter } from './services/auth'

createConnection()
  .then(async connection => {
    // await connection.runMigrations()
    //
    const app = express()

    // app.use(helmet())
    // app.use(bodyParser.json())
    // app.use(bodyParser.urlencoded({ extended: false }))

    // app.use('/auth', authRouter)
    // app.use(Auth.isAuth)
    // app.use('/api', Object.values(routes))
    //
    // app.use(errors())
    // app.use((err, req, res, next) => {
    //   const msg = err.message || err
    //   const status = err.status || 500
    //
    //   res.status(status).send(msg)
    //   logger.error(routeLog(err, req))
    // })
    //
      app.get('/', (req, res) => {
          res.send('Hello World!')
      })

      app.listen(process.env.API_INNER_PORT, () => {
          console.log(`Example app listening at http://localhost:${process.env.API_INNER_PORT}`)
      })

  })
  .catch(err => logger.error(`TypeORM connection error: ${err}`))
