import {Request, Response} from "express";
import {ProductService} from "./ProductService";
import {HttpCode} from "../common/HttpCode";

export class ProductController {
    public static getProduct = async (req:Request, res:Response) => {
      const productService = new ProductService();
      const product = await productService.getProduct(req.params.productId);

      if (product) {
        res.json(product);
      } else {
        res.status(HttpCode.NOT_FOUND).end();
      }
    }

    public static getProducts = async (req:Request, res:Response) => {
      const productService = new ProductService();
      const products = await productService.getProducts();

      res.json(products);
    }
}
