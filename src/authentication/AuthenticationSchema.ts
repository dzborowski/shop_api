import * as Joi from "joi";

export class AuthenticationSchema {
    public static login = Joi.object().keys({
      email: Joi.string()
          .email()
          .required(),
      password: Joi.string()
          .min(6)
          .required(),
    });
}
