import {Router} from "express";
import {celebrate} from "celebrate";
import * as asyncHandler from "express-async-handler";
import {UserController} from "./UserController";
import {UserSchema} from "./UserSchema";

export const UserRouter = Router();

UserRouter
    .route("/")
    .post(celebrate({body: UserSchema.createUser}), asyncHandler(UserController.createUser));

UserRouter
    .route("/:id")
    .get(celebrate({params: UserSchema.getUser}), asyncHandler(UserController.getUser));
