import {Router} from "express";
import {celebrate} from "celebrate";
import * as asyncHandler from "express-async-handler";
import {UserController} from "./UserController";
import {UserSchema} from "./UserSchema";

export const UserRouter = Router();

UserRouter
    .route("/:id")
    .get(celebrate({params: UserSchema.getUserParams}), asyncHandler(UserController.getUser));
