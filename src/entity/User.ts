import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  BaseEntity
} from 'typeorm'

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  public id: number

  @Column({ type: 'varchar', length: 255 })
  public firstName: string

  @Column({ type: 'varchar', length: 255 })
  public lastName: string

  @Column({ type: 'varchar', length: 255, unique: true })
  public email: string

  @Column({ type: 'varchar', length: 255, select: false })
  public password: string

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt: Date

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt: Date
}

export default User
