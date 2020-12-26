import {Request, Response} from "express";
import {UserService} from "./UserService";

export class UserController {
    public static getUser = async (req: Request, res: Response) => {
      const userService = new UserService();
      const user = await userService.getUser(req.params.id);

      if (user) {
        delete user.password;
        res.status(200).json(user);
      } else {
        res.status(404).end();
      }
    }
}

