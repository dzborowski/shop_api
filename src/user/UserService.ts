import {getRepository} from "typeorm";
import {UserEntity} from "./UserEntity";

export class UserService {
  public async isUserExist(userId:string):Promise<boolean> {
    return !!await this.getUser(userId);
  }

  public async getUser(userId:string):Promise<UserEntity> {
    const userRepository = getRepository(UserEntity);

    return userRepository.findOne({id: userId});
  }
}
