import * as handler from "express-async-handler";
import {Router} from "express";
import {celebrate} from "celebrate";
import * as schema from "../user/schema";
import RouteError from "../common/error";
import {AUTH_MISS, OPEN_ROUTES} from "../common/constants";

class Auth {
  public static isAuth(req, res, next) {
    const token = req.headers.authorization;
    const isOpen = OPEN_ROUTES.some(
        ({route, method}) => route === req.originalUrl && method === req.method,
    );

    if (token || isOpen) {
      next();
    } else if (!token || !isOpen) {
      next(new RouteError(AUTH_MISS, 401));
    }
  }

  public static async login(req, res, next) {
    res.send("login");
  }

  public static async loginGoogle(req, res, next) {
    res.send("loginGoogle");
  }
}

const authRouter = Router();

authRouter.post(
    "/login",
    celebrate({body: schema.loginBody}),
    handler(Auth.login),
);
authRouter.post("/google", Auth.loginGoogle);

export {Auth, authRouter};
