import {Request, Response} from "express";
import {UserService} from "./UserService";
import {HttpCode} from "../common/HttpCode";

export class UserController {
    public static getUser = async (req: Request, res: Response) => {
        const userService = new UserService();
        const user = await userService.getUser(req.params.userId);

        if (user) {
            delete user.password;
            res.json(user);
        } else {
            res.status(HttpCode.NOT_FOUND).end();
        }
    }
}

