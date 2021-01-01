import {Router} from "express";
import {celebrate} from "celebrate";
import * as asyncHandler from "express-async-handler";
import {BasketController} from "./BasketController";
import {BasketRequestSchema} from "./BasketRequestSchema";

export const BasketRouter = Router();

BasketRouter
    .route("/:basketId")
    .get(asyncHandler(BasketController.getProductsInBasket));

BasketRouter
    .route("/")
    .post(
        celebrate({body: BasketRequestSchema.addProductToBasketBody}),
        asyncHandler(BasketController.addProductToBasket),
    );

BasketRouter
    .route("/")
    .delete(
        celebrate({body: BasketRequestSchema.removeProductFromBasketBody}),
        asyncHandler(BasketController.removeProductFromBasket),
    );
