import {Request, Response} from "express";
import {BasketService} from "./BasketService";
import {HttpCode} from "../common/HttpCode";

export class BasketController {
    public static getProductsInBasket = async (req:Request, res:Response) => {
      const basketService = new BasketService();
      const productsInBasket = await basketService.getItemsInBasket(req.user.id);

      res.json(productsInBasket);
    }

    public static addProductToBasket = async (req:Request, res:Response) => {
      const basketService = new BasketService();
      const productAddedToBasket = await basketService.addItemToBasket(
          req.body.productId,
          req.body.productQuantity,
          req.user.id,
      );

      res.status(HttpCode.CREATED_SUCCESS).json(productAddedToBasket);
    }

    public static removeProductFromBasket = async (req:Request, res:Response) => {
      const basketService = new BasketService();
      await basketService.removeItemFromBasket(req.body.basketItemId);

      res.status(HttpCode.NO_CONTENT_SUCCESS).end();
    }
}
