import * as UserService from '../services/user.service'
import * as argon2 from 'argon2'
import jwt from 'jsonwebtoken';

export function verifyToken(token: string) {
    if (process.env.JWT_SECRET_KEY === undefined) {
      throw new Error();
    }
  
    return jwt.verify(token, process.env.JWT_SECRET_KEY);
  }

export async function login(email: string, password: string): Promise<String>{
    try {
        const userFromDb = await UserService.getUserEmail(email);
        if(await argon2.verify(userFromDb.password, password)){
            const token = signJwt({
                email: userFromDb.email,
                role: userFromDb.roles
            })

            return token;

        } else {
            throw new Error();
        }
    } catch (error) {
        throw new Error ("Invalid Auth");
    }
}

export function signJwt(payload: any) {
    if (process.env.JWT_SECRET_KEY === undefined) {
      throw new Error();
    }
  
    return jwt.sign(payload, process.env.JWT_SECRET_KEY, {
      expiresIn: 60 * 60,
    });
  }