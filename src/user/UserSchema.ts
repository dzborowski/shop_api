import * as Joi from "joi";

export class UserSchema {
    public static getUserParams = Joi.object().keys({
      id: Joi.string().uuid().required(),
    });
}
