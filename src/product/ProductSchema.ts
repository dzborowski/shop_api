import * as Joi from "joi";

export class ProductSchema {
    public static getProductParams = Joi.object().keys({
      id: Joi.string().uuid().required(),
    });
}
