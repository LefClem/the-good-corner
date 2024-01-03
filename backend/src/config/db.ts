import { DataSource } from "typeorm";
import { Ad } from "../entities/ad";
import { Category } from "../entities/category";
import { Tag } from "../entities/tag";
import { User } from "../entities/user";

// export const dataSource = new DataSource({
//     type : "sqlite",
//     database : "./good-corner.sqlite",
//     entities: ["src/entities/*.ts"],
//     synchronize: true
// })

export const dataSource = new DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "clement",
    password: "Klapaucius972!",
    database: "goodcorner",
    entities: [Ad, Category, Tag, User],
    logging: true,
    synchronize: true
})