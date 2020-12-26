import {Router} from "express";
import {celebrate} from "celebrate";
import * as asyncHandler from "express-async-handler";
import {AuthenticationSchema} from "./AuthenticationSchema";
import {AuthenticationController} from "./AuthenticationController";

export const AuthenticationRouter = Router();

AuthenticationRouter
    .route("/login")
    .post(celebrate({body: AuthenticationSchema.login}), asyncHandler(AuthenticationController.login));
