import * as Joi from "joi";

export class OrderRequestSchema {
    public static getOrderParams = Joi.object().keys({
        orderId: Joi.string().uuid().required(),
    });
}
