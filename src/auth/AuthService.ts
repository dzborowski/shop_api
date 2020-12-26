import {getRepository} from "typeorm";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import {UserEntity} from "../user/UserEntity";
import {IAuthLoginTokens} from "./IAuthLoginTokens";
import {AuthTokenType} from "./AuthTokenType";
import {IAuthTokenPayload} from "./IAuthTokenPayload";
import {NextFunction, Request, Response} from "express";

export class AuthService {
    protected static USER_PASSWORD_SALT_ROUNDS = 12;
    protected static AUTHORIZATION_TYPE = "Bearer";

    public async register(userData:any):Promise<UserEntity> {
      const userRepository = getRepository(UserEntity);
      const isUserAlreadyExist = await userRepository.findOne({email: userData.email});

      if (isUserAlreadyExist) {
        throw new Error("User with provided email already exits.");
      }

      const hashedPassword = await bcrypt.hash(userData.password, AuthService.USER_PASSWORD_SALT_ROUNDS);

      return userRepository.save({...userData, password: hashedPassword});
    }

    public async login(email: string, password: string):Promise<IAuthLoginTokens> {
      const userRepository = getRepository(UserEntity);
      const user = await userRepository.findOne({email});

      if (!user) {
        throw new Error("User with provided email didn't exits.");
      }

      const isPasswordMatch = await bcrypt.compare(password, user.password);

      if (!isPasswordMatch) {
        throw new Error("Password didn't match.");
      }

      return this.generateLoginTokens(user);
    }

    public static async verifyAccessToken(req: Request, res: Response, next: NextFunction) {
      const accessToken = req.headers.authorization;
      const parsedAccessToken = AuthService.getParsedToken(accessToken);

      try {
        const payload = jwt.verify(parsedAccessToken.credentials, process.env.JWT_SECRET) as IAuthTokenPayload;
        const userRepository = getRepository(UserEntity);
        const user = await userRepository.findOne({id: payload.userId});

        if (!user) {
          next("User didn't exits.");
        }

        // @ts-ignore
        req.user = user;
        next();
      } catch (err) {
        next(err);
      }
    }

    public async refreshAccessToken(refreshToken:string): Promise<IAuthLoginTokens> {
      const parsedRefreshToken = AuthService.getParsedToken(refreshToken);
      const payload = jwt.verify(parsedRefreshToken.credentials, process.env.JWT_SECRET) as IAuthTokenPayload;
      const userRepository = getRepository(UserEntity);
      const user = await userRepository.findOne({id: payload.userId});

      if (!user) {
        throw new Error("User didn't exits.");
      }

      return this.generateLoginTokens(user);
    }

    protected async generateLoginTokens(user:UserEntity):Promise<IAuthLoginTokens> {
      const userId = user.id;

      const accessTokenPayload:IAuthTokenPayload = {
        userId,
        type: AuthTokenType.ACCESS,
      };
      const accessToken = jwt.sign(accessTokenPayload, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });

      const refreshTokenPayload:IAuthTokenPayload = {
        userId,
        type: AuthTokenType.REFRESH,
      };
      const refreshToken = jwt.sign(refreshTokenPayload, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });

      return {accessToken, refreshToken};
    }

    protected static getParsedToken(token:string):{type:string; credentials:string} {
      if (!token) {
        throw new Error("Token is missing.");
      }

      const [type, credentials] = token.split(" ");

      if (type !== AuthService.AUTHORIZATION_TYPE) {
        throw new Error(`Invalid token authorization type, ${AuthService.AUTHORIZATION_TYPE} is required.`);
      }

      return {type, credentials};
    }
}
