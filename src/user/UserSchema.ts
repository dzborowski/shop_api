import * as Joi from "joi";

export class UserSchema {
    public static getUser = Joi.object().keys({
      id: Joi.string().uuid().required(),
    });
}
