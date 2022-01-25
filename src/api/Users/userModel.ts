import {BaseEntity, Entity, PrimaryGeneratedColumn, Column} from "typeorm"

@Entity()
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column("boolean", { default: false })
    isLoggedIn: boolean

    @Column()
    following : string

    @Column()
    followers: string
}