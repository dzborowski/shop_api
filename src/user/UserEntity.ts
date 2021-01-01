import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import {BasketEntity} from "../basket/BasketEntity";
import {OrderEntity} from "../order/OrderEntity";

@Entity({name: "user"})
export class UserEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({type: "varchar", length: 255})
    public firstName: string;

    @Column({type: "varchar", length: 255})
    public lastName: string;

    @Column({type: "varchar", length: 255, unique: true})
    public email: string

    @Column({type: "varchar", length: 255})
    public password: string;

    @CreateDateColumn({type: "timestamp"})
    public createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    public updatedAt: Date;

    @OneToMany(() => BasketEntity, (basket) => basket.user)
    public productsAddedToBasket: BasketEntity[];

    @OneToMany(() => OrderEntity, (order) => order.user)
    public orders: OrderEntity;
}
