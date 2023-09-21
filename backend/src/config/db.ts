import { DataSource } from "typeorm";
import { Ad } from "../entities/ad";

export const dataSource = new DataSource({
    type : "sqlite",
    database : "../../good-corner-sqlite.sqlite",
    entities: ["src/entities/*.ts"],
    synchronize: true
})