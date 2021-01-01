import * as Joi from "joi";

export class BasketRequestSchema {
    public static addProductToBasketBody = Joi.object().keys({
        productId: Joi.string().uuid().required(),
        productQuantity: Joi.number().greater(0).required(),
    });

    public static removeProductFromBasketBody = Joi.object().keys({
        basketItemId: Joi.string().uuid().required(),
    });
}
