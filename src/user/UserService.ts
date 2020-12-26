import {getRepository} from "typeorm";
import {UserEntity} from "./UserEntity";

export class UserService {
  public async getUser(userId:string):Promise<UserEntity> {
    const userRepository = getRepository(UserEntity);

    return await userRepository.findOne({id: userId});
  }
}
