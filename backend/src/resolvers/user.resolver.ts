import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entities/user";
import * as UserService from '../services/user.service'
import * as AuthService from '../services/auth.service'

@Resolver(User)
export class UserResolver {
    @Mutation(() => User)
    signUp(
        @Arg("email") email: string,
        @Arg("password") password: string
    ): Promise<User> {
        return UserService.create(email, password);
    }

    @Mutation(() => String)
    signIn(
        @Arg("email") email: string,
        @Arg("password") password: string
    ): Promise<String> {
        try {
            return AuthService.login(email, password);
          } catch (e) {
            throw new Error("Invalid Auth");
          }    }
}