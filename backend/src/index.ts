import "reflect-metadata";
import { dataSource } from '../src/config/db'
import { buildSchema } from 'type-graphql';
import { CategoryResolver } from './resolvers/category.resolver';
import { ApolloServer } from "apollo-server";
import { AdResolver } from "./resolvers/ad.resolver";
import { UserResolver } from "./resolvers/user.resolver";
import { verifyToken } from "./services/auth.service";
import { getUserEmail } from "./services/user.service";
import * as dotenv from 'dotenv';

const port: number = 3001;

const start = async () => {
    dotenv.config()
    await dataSource.initialize();
    const schema = await buildSchema({
        resolvers: [CategoryResolver, AdResolver, UserResolver],
        validate: { forbidUnknownValues : false},
        authChecker: async ({ context }, roles) => {
            try {
              const payload: any = verifyToken(context.token);
              const userFromDB = await getUserEmail(payload.email);
              context.user = userFromDB;

              if (roles.length >= 1) {
                if (roles.includes(context.user.role)) {
                  return true;
                }
                else {
                  return false;
                }
              }
      
              return true;
            } catch(e) {
              return false;
            }
          }
    });
    const server = new ApolloServer({
        schema,
        context: ({ req }) => {
            if (
              req?.headers.authorization === undefined ||
              process.env.JWT_SECRET_KEY === undefined
            ) {
              return {};
            } else {
              try {
                const bearer = req.headers.authorization.split("Bearer ")[1];
                return { token: bearer };
              } catch (e) {
                console.log(e);
                return {};
              }
            }
          },
    });
    
    try {
        const {url} = await server.listen({ port })
        console.log(`Server running at ${url}`);
        
    } catch (error) {
        console.error("Error starting server");
        
    }
}

void start();
