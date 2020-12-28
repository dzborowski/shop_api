import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as helmet from "helmet";
import * as bodyParser from "body-parser";
import * as asyncHandler from "express-async-handler";
import ormConfig from "./OrmConfig";
import {UserRouter} from "./user/UserRouter";
import {AuthRouter} from "./auth/AuthRouter";
import {AuthService} from "./auth/AuthService";
import {ErrorHandler} from "./common/ErrorHandler";
import {ProductRouter} from "./product/ProductRouter";

createConnection(ormConfig)
    .then(() => {
      const app = express();

      app.use(helmet());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended: false}));

      app.use("/api/auth", AuthRouter);
      app.use("/api/users", asyncHandler(AuthService.verifyAuth), UserRouter);
      app.use("/api/products", ProductRouter);

      app.use(ErrorHandler.handleError);

      app.listen(process.env.API_INNER_PORT, () => {
        console.log(`App listening at http://localhost:${process.env.API_INNER_PORT}`);
      });
    })
    .catch((err) => console.error(`Database connection error: ${err}`));
