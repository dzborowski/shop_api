import {ProductEntity} from "./ProductEntity";
import {getRepository} from "typeorm";

export class ProductService {
  public async isProductExist(productId:string):Promise<boolean> {
    return !!await this.getProduct(productId);
  }

  public async getProduct(productId:string) :Promise<ProductEntity> {
    const productRepository = getRepository(ProductEntity);

    return productRepository.findOne({id: productId});
  }

  public async getProducts() :Promise<ProductEntity[]> {
    const productRepository = getRepository(ProductEntity);

    return productRepository.find();
  }
}
