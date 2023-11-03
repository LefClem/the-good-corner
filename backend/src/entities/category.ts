import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Ad } from "./ad";
import { Field, ObjectType } from "type-graphql";

@Entity()
@ObjectType()
export class Category extends BaseEntity{
    @PrimaryGeneratedColumn()
    @Field()
    id: number;

    @Column()
    @Field()
    name: string;

    @OneToMany(() => Ad, ad => ad.category)
    ad: Ad[];
}