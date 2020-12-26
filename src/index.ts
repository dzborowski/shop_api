import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import {UserRouter} from "./user/UserRouter";
import {AuthRouter} from "./auth/AuthRouter";

createConnection()
    .then(() => {
      const app = express();

      app.use(helmet());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended: false}));

      app.use("/api/auth", AuthRouter);
      app.use("/api/users", UserRouter);

      app.use((err, req, res, next) => {
        const errorMessage = err.message || err;
        const errorStatus = err.status || 500;

        res.status(errorStatus).send(errorMessage);
      });

      app.listen(process.env.API_INNER_PORT, () => {
        console.log(`Example app listening at http://localhost:${process.env.API_INNER_PORT}`);
      });
    })
    .catch((err) => console.error(`TypeORM connection error: ${err}`));
