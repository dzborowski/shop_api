import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from "typeorm";
import {UserEntity} from "../user/UserEntity";
import {OrderedItemEntity} from "./OrderedItemEntity";

@Entity({name: "order"})
export class OrderEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({type: "boolean", default: false})
    public isPaid:boolean;

    @CreateDateColumn({type: "timestamp"})
    public createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    public updatedAt: Date;

    @ManyToOne(() => UserEntity, (user) => user.orders)
    public user: UserEntity;

    @OneToMany(() => OrderedItemEntity, (orderedItem) => orderedItem.order)
    public orderedItems: OrderedItemEntity[];
}
