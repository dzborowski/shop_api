import {Request, Response} from "express";
import {UserService} from "./UserService";

export class UserController {
    public static createUser = async (request: Request, response: Response) => {
      const userService = new UserService();
      const user = await userService.createUser(request.body);

      delete user.password;
      response.status(200).json(user);
    }

    public static getUser = async (request: Request, response: Response) => {
      const userService = new UserService();
      const user = await userService.getUser(request.params.id);

      if (user) {
        delete user.password;
        response.status(200).json(user);
      } else {
        response.status(404).end();
      }
    }
}

