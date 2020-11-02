import User from "../../entity/User";
import UserController from "../../controllers/user";
import {getCrudRouter} from "../../shared/router";
import {IRouterConfig} from "../../shared/models";
import * as schema from "./schema";

const service = new UserController(User);
const config: IRouterConfig = {
  prefix: "/users",
  createObj: schema.createBody,
  updateObj: schema.updateBody,
};
const router = getCrudRouter(service, config);

export default router;
