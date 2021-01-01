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
import {AppConfig} from "./AppConfig";
import {BasketRouter} from "./basket/BasketRouter";

require("dotenv").config();

createConnection(ormConfig)
    .then(() => {
      const app = express();

      app.use(helmet());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({extended: false}));

      app.use("/api/auth", AuthRouter);
      app.use("/api/users", asyncHandler(AuthService.verifyAuth), UserRouter);
      app.use("/api/products", ProductRouter);
      app.use("/api/basket", asyncHandler(AuthService.verifyAuth), BasketRouter);

      app.use(ErrorHandler.handleError);

      const appPort = AppConfig.getAppPort();

      app.listen(appPort, () => {
        console.log(`App listening at http://localhost:${appPort}`);
      });
    })
    .catch((err) => console.error(`Database connection error: ${err}`));
