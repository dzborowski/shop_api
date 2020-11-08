import * as Joi from "joi";

export class UserSchema {
    public static create = Joi.object().keys({
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
          .required(),
    });
}
