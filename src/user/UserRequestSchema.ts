import * as Joi from "joi";

export class UserRequestSchema {
    public static getUserParams = Joi.object().keys({
        userId: Joi.string().uuid().required(),
    });
}
