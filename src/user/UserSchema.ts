import * as Joi from "joi";

export class UserSchema {
    public static createUser = Joi.object().keys({
      firstName: Joi.string()
          .alphanum()
          .min(2)
          .max(30)
          .required(),
      lastName: Joi.string()
          .alphanum()
          .min(2)
          .max(30)
          .required(),
      email: Joi.string()
          .email()
          .required(),
      password: Joi.string()
          .min(6)
          .max(30)
          .required(),
    });

    public static getUser = Joi.object().keys({
      id: Joi.string().uuid().required(),
    });
}
