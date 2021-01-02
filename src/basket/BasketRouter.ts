import {Router} from "express";
import {celebrate} from "celebrate";
import * as asyncHandler from "express-async-handler";
import {BasketController} from "./BasketController";
import {BasketRequestSchema} from "./BasketRequestSchema";

export const BasketRouter = Router();

BasketRouter
    .route("/")
    .post(
        celebrate({body: BasketRequestSchema.addProductToBasketBody}),
        asyncHandler(BasketController.addProductToBasket),
    );

BasketRouter
    .route("/")
    .get(asyncHandler(BasketController.getProductsInBasket));

BasketRouter
    .route("/:basketItemId")
    .delete(
        celebrate({params: BasketRequestSchema.removeProductFromBasketBody}),
        asyncHandler(BasketController.removeItemFromBasket),
    );
