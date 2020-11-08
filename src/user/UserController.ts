import {Request, Response} from "express";
import {UserEntity} from "./UserEntity";

export class UserController {
    public user: UserEntity;

    public static createUser = async (request: Request, response: Response) => {
    // const data = req.body;
    // const repo = getRepository(User);
    // const isExist = await repo.findOne({email: data.email});
    //
    // if (isExist) {
    //   throw new RouteError(USER_EXIST, 400);
    // }
    //
    // const password = await bcrypt.hash(data.password, SALT_ROUNDS);
    // const user = await repo.save({...data, password});
    //   response.status(200).json(user);
      response.status(201).send("created");
    }

    public static getUser = async (request: Request, response: Response) => {
      response.status(200).send("user");
    }
}

