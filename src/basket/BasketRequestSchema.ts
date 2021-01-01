import * as Joi from "joi";

export class BasketRequestSchema {
    public static getBasketParams = Joi.object().keys({
      basketId: Joi.string().uuid().required(),
    });

    public static addProductToBasketBody = Joi.object().keys({
      productId: Joi.string().uuid().required(),
      basketId: Joi.string().uuid().required(),
    });

    public static removeProductFromBasketBody = Joi.object().keys({
      productId: Joi.string().uuid().required(),
      basketId: Joi.string().uuid().required(),
    });
}
