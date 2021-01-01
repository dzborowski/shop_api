import {Request, Response} from "express";
import {BasketService} from "./BasketService";
import {HttpCode} from "../common/HttpCode";

export class BasketController {
    public static getProductsInBasket = async (req:Request, res:Response) => {
      const basketService = new BasketService();
      const productsInBasket = await basketService.getProductsInBasket(req.user.id);

      res.json(productsInBasket);
    }

    public static addProductToBasket = async (req:Request, res:Response) => {
      const basketService = new BasketService();
      const productAddedToBasket = await basketService.addProductToBasket(
          req.body.productId,
          req.body.productQuantity,
          req.user.id,
      );

      res.status(HttpCode.CREATED_SUCCESS).json(productAddedToBasket);
    }

    public static removeItemFromBasket = async (req:Request, res:Response) => {
      const basketService = new BasketService();
      await basketService.removeItemFromBasket(req.params.basketItemId);

      res.status(HttpCode.NO_CONTENT_SUCCESS).end();
    }
}
