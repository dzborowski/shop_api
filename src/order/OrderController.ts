import {Request, Response} from "express";
import {OrderService} from "./OrderService";
import {HttpCode} from "../common/HttpCode";

export class OrderController {
    public static createOrder = async (req:Request, res:Response) => {
        const orderService = new OrderService();
        const order = await orderService.createOrder(req.user);

        res.json(order);
    }

    public static payForOrder = async (req:Request, res:Response) => {
        const orderService = new OrderService();

        await orderService.payForOrder(req.params.orderId);
        res.status(HttpCode.NO_CONTENT_SUCCESS).end();
    }

    public static getOrder = async (req:Request, res:Response) => {
        const orderService = new OrderService();
        const order = await orderService.getOrder(req.params.orderId, req.user);

        if (order) {
            res.json(order);
        } else {
            res.status(HttpCode.NOT_FOUND).end();
        }
    }

    public static getOrders = async (req:Request, res:Response) => {
        const orderService = new OrderService();
        const orders = await orderService.getOrders( req.user);

        res.json(orders);
    }
}
