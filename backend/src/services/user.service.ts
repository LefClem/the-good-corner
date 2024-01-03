import { User } from "../entities/user";
import * as argon2 from 'argon2'

export async function create(email: string, password: string):Promise<User>{
    let newUser = new User();
    newUser.email = email;
    newUser.password = await argon2.hash(password);
    newUser.roles = "USER";

    return newUser.save();
}

export function getUserEmail(email: string):Promise<User>{
    return User.findOneByOrFail({ email });
}