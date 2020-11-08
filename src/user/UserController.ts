import User from "./User";
import {Request, Response} from "express";

export class UserController {
    public user: User;

  public async create = (req: Request, res: Response) => {
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

