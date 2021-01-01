import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {UserEntity} from "../user/UserEntity";
import {ProductEntity} from "../product/ProductEntity";

@Entity({name: "basket"})
export class BasketEntity {
    @PrimaryGeneratedColumn("uuid")
    public id!: number;

    @Column()
    public userId!: string;

    @Column()
    public productId!: string;

    @Column()
    public quantity!: number;

    @ManyToOne(() => UserEntity, (user) => user.productsAddedToBasket)
    public user!: UserEntity;

    @ManyToOne(() => ProductEntity, (product) => product.usersAddedProduct)
    public product!: ProductEntity;
}
