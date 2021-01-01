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

@Entity({name: "product"})
export class ProductEntity extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    public id: string;

    @Column({type: "varchar", length: 255})
    public name: string;

    @Column({type: "text"})
    public description: string;

    @Column({type: "decimal", precision: 10, scale: 2})
    public price: number;

    @Column({type: "int", default: 1})
    public availableCopiesQuantity: number;

    @CreateDateColumn({type: "timestamp"})
    public createdAt: Date;

    @UpdateDateColumn({type: "timestamp"})
    public updatedAt: Date;

    @OneToMany(() => BasketEntity, (basket) => basket.product)
    public usersAddedProduct!: BasketEntity[];
}
