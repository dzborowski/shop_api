import {Router} from "express";
import {celebrate} from "celebrate";
import * as Joi from "joi";
import * as asyncHandler from "express-async-handler";
import {UserController} from "./UserController";
import {UserSchema} from "./UserSchema";

export const UserRouter = Router();

UserRouter
    .route("/")
    .post(celebrate({body: UserSchema.create}), asyncHandler(UserController.createUser));

UserRouter
    .route("/:id")
    .get(celebrate({params: Joi.object().keys({
      id: Joi.number().required(),
    })}), asyncHandler(UserController.getUser));
