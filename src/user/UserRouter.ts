import {Router} from "express";
import {celebrate} from "celebrate";
import * as asyncHandler from "express-async-handler";
import {UserController} from "./UserController";
import {UserRequestSchema} from "./UserRequestSchema";

export const UserRouter = Router();

UserRouter
    .route("/:userId")
    .get(celebrate({params: UserRequestSchema.getUserParams}), asyncHandler(UserController.getUser));
