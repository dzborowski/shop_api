import {Router} from "express";
import {celebrate} from "celebrate";
import * as asyncHandler from "express-async-handler";
import {ProductController} from "./ProductController";
import {ProductRequestSchema} from "./ProductRequestSchema";

export const ProductRouter = Router();

ProductRouter
    .route("/:productId")
    .get(celebrate({params: ProductRequestSchema.getProductParams}), asyncHandler(ProductController.getProduct));

ProductRouter
    .route("/")
    .get( asyncHandler(ProductController.getProducts));
