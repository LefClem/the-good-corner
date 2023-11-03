import "reflect-metadata";
import { dataSource } from '../src/config/db'
import { buildSchema } from 'type-graphql';
import { CategoryResolver } from './resolvers/category.resolver';
import { ApolloServer } from "apollo-server";
import { AdResolver } from "./resolvers/ad.resolver";

const port: number = 3001;

const start = async () => {
    await dataSource.initialize();
    const schema = await buildSchema({
        resolvers: [CategoryResolver, AdResolver],
        validate: { forbidUnknownValues : false}
    });
    const server = new ApolloServer({
        schema
    });
    
    try {
        const {url} = await server.listen({ port })
        console.log(`Server running at ${url}`);
        
    } catch (error) {
        console.error("Error starting server");
        
    }
}

void start();
