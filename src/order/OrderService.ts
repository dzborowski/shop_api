import {OrderEntity} from "./OrderEntity";
import {EntityManager, getConnection, getRepository} from "typeorm";
import {UserEntity} from "../user/UserEntity";
import {BasketEntity} from "../basket/BasketEntity";
import {OrderedItemEntity} from "./OrderedItemEntity";
import {ApiError} from "../common/ApiError";
import {HttpCode} from "../common/HttpCode";

export class OrderService {
    public async createOrder(user:UserEntity):Promise<Partial<OrderEntity>> {
        return getConnection().transaction(async (transactionalEntityManager:EntityManager) => {
            const order = new OrderEntity();
            const userItemsInBasket = await transactionalEntityManager.find(BasketEntity, {
                where: {userId: user.id},
                relations: ["product"],
            });

            if (!userItemsInBasket.length) {
                throw new ApiError({
                    message: "Cannot create empty order. Please add some products to basket first.",
                    httpCode: HttpCode.BAD_REQUEST,
                });
            }

            const orderedItems = userItemsInBasket.map((userItemInBasket:BasketEntity) => {
                const orderedItem = new OrderedItemEntity();
                orderedItem.quantity = userItemInBasket.quantity;
                orderedItem.price = userItemInBasket.product.price;
                orderedItem.order = order;
                orderedItem.product = userItemInBasket.product;

                return orderedItem;
            });

            order.user = user;
            order.orderedItems = orderedItems;

            await transactionalEntityManager.save(order);
            await transactionalEntityManager.save(orderedItems);
            await transactionalEntityManager.remove(userItemsInBasket);

            return {id: order.id};
        });
    }

    public async payForOrder(orderId:string) {

    }

    public getOrder(orderId:string, user:UserEntity):Promise<OrderEntity> {
        const orderRepository = getRepository(OrderEntity);

        return orderRepository.findOne({
            where: {id: orderId, user},
            relations: ["orderedItems", "orderedItems.product"],
        });
    }

    public getOrders( user:UserEntity):Promise<OrderEntity[]> {
        const orderRepository = getRepository(OrderEntity);

        return orderRepository.find({user});
    }
}
