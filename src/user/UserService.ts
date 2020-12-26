import {getRepository} from "typeorm";
import {UserEntity} from "./UserEntity";
import * as bcrypt from "bcryptjs";

export class UserService {
    protected static USER_PASSWORD_SALT_ROUNDS = 12;

    public async createUser(userData:any):Promise<UserEntity> {
      const userRepository = getRepository(UserEntity);
      const isUserAlreadyExist = await userRepository.findOne({email: userData.email});

      if (isUserAlreadyExist) {
        throw new Error("User with provided email already exits.");
      }

      const hashedPassword = await bcrypt.hash(userData.password, UserService.USER_PASSWORD_SALT_ROUNDS);

      return userRepository.save({...userData, password: hashedPassword});
    }

    public async getUser(userId:string):Promise<UserEntity> {
      const userRepository = getRepository(UserEntity);

      return await userRepository.findOne({id: userId});
    }
}
