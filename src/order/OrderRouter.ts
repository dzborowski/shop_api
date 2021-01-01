import {Router} from "express";
import {celebrate} from "celebrate";
import * as asyncHandler from "express-async-handler";
import {OrderController} from "./OrderController";
import {OrderRequestSchema} from "./OrderRequestSchema";

export const OrderRouter = Router();

OrderRouter
    .route("/:orderId")
    .get(celebrate({params: OrderRequestSchema.getOrderParams}), asyncHandler(OrderController.getOrder));

OrderRouter
    .route("/")
    .get(asyncHandler(OrderController.getOrders));

OrderRouter
    .route("/")
    .post( asyncHandler(OrderController.createOrder));
