import * as bcrypt from "bcryptjs";
import {getRepository} from "typeorm";
import User from "../../entity/User";
import CurdController from "../../shared/crud-controller";
import RouteError from "../../shared/error";
import {SALT_ROUNDS, USER_EXIST} from "../../shared/constants";

class UserController extends CurdController<User> {
    constructor(model) {
        super(model);
    }

    public async create(req, res) {
        const data = req.body;
        const repo = getRepository(User);
        const isExist = await repo.findOne({email: data.email});

        if (isExist) {
            throw new RouteError(USER_EXIST, 400);
        }

        const password = await bcrypt.hash(data.password, SALT_ROUNDS);
        const user = await repo.save({...data, password});
        res.status(200).json(user);
    }
}

export default UserController;
