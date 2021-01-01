import * as Joi from "joi";

export class ProductRequestSchema {
    public static getProductParams = Joi.object().keys({
        productId: Joi.string().uuid().required(),
    });
}
