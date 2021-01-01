import {BasketEntity} from "./BasketEntity";
import {getRepository} from "typeorm";
import {UserService} from "../user/UserService";
import {ProductService} from "../product/ProductService";
import {ApiError} from "../common/ApiError";
import {HttpCode} from "../common/HttpCode";

export class BasketService {
    public getProductsInBasket(userId:string):Promise<BasketEntity[]> {
        const basketRepository = getRepository(BasketEntity);

        return basketRepository.find({userId});
    }

    public async addProductToBasket(productId:string, productQuantity:number, userId:string):Promise<BasketEntity> {
        const userService = new UserService();
        const productService = new ProductService();
        const basketRepository = getRepository(BasketEntity);

        const isUserExist = await userService.isUserExist(userId);

        if (!isUserExist) {
            throw new ApiError({message: "User didn't exit", httpCode: HttpCode.NOT_FOUND});
        }

        const isProductExist = await productService.isProductExist(productId);

        if (!isProductExist) {
            throw new ApiError({message: "Product didn't exit", httpCode: HttpCode.NOT_FOUND});
        }

        if (productQuantity <= 0) {
            throw new ApiError({message: "Product quantity must have positive value", httpCode: HttpCode.BAD_REQUEST});
        }

        return basketRepository.save({productId, quantity: productQuantity, userId});
    }

    public async removeItemFromBasket(basketItemId:string) {
        const basketRepository = getRepository(BasketEntity);
        await basketRepository.delete(basketItemId);
    }
}
