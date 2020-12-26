import {Request, Response} from "express";
import {AuthService} from "./AuthService";

export class AuthController {
    public static register = async (req: Request, res: Response) => {
      const authService = new AuthService();
      const user = await authService.register(req.body);

      delete user.password;
      res.status(200).json(user);
    }

    public static login = async (req: Request, res: Response) => {
      const authService = new AuthService();
      const authTokens = await authService.login(req.body.email, req.body.password);

      res.status(200).json(authTokens);
    }

    public static refresh = async (req: Request, res: Response) => {
      const refreshToken = req.body.refreshToken;
      const authService = new AuthService();
      const authTokens = await authService.refreshAccessToken(refreshToken);

      res.status(200).json(authTokens);
    }
}
