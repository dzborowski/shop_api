import {Router} from "express";
import {celebrate} from "celebrate";
import * as asyncHandler from "express-async-handler";
import {ProductController} from "./ProductController";
import {ProductSchema} from "./ProductSchema";

export const ProductRouter = Router();

ProductRouter
    .route("/:id")
    .get(celebrate({params: ProductSchema.getProductParams}), asyncHandler(ProductController.getProduct));

ProductRouter
    .route("/")
    .get( asyncHandler(ProductController.getProducts));
