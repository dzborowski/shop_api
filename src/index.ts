import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";

createConnection()
    .then(async (connection) => {
      await connection.runMigrations();

      const app = express();

      app.use(helmet());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended: false}));

      // app.use('api/auth', authRouter)

      app.use((err, req, res, next) => {
        const msg = err.message || err;
        const status = err.status || 500;

        res.status(status).send(msg);
      });

      app.listen(process.env.API_INNER_PORT, () => {
        console.log(`Example app listening at http://localhost:${process.env.API_INNER_PORT}`);
      });
    })
    .catch((err) => console.error(`TypeORM connection error: ${err}`));
