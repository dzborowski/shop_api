import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import {OrderEntity} from "./OrderEntity";
import {ProductEntity} from "../product/ProductEntity";

@Entity({name: "ordered_item"})
export class OrderedItemEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column()
    public quantity: number;

    @Column({type: "decimal", precision: 10, scale: 2})
    public price: number;

    @CreateDateColumn({type: "timestamp"})
    public createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    public updatedAt: Date;

    @ManyToOne(() => OrderEntity, (order) => order.orderedItems)
    public order: OrderEntity;

    @ManyToOne(() => ProductEntity, (product) => product.orderedItems)
    public product: ProductEntity;
}
