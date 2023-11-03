import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";


@Entity()
export class Tag extends BaseEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 50 })
    name: string;
}