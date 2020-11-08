import {Request, Response} from "express";
import {UserEntity} from "./UserEntity";

export class UserController {
    public user: UserEntity;

    public create = async (request: Request, response: Response) => {
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
    // res.status(200).json(user);
    }
}

