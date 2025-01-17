/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserI } from "src/user/user.interface";

import bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) {

    }

    async generateJwt(user: UserI): Promise<string> {
        return this.jwtService.signAsync({user})
    }

    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 12)
    }

    async comparePasswords(password: string, storedPasswordHash: string): Promise<boolean> {
        return bcrypt.compare(password, storedPasswordHash)
    }

    async verifyJwt(jwt: string): Promise<any> {
        return this.jwtService.verifyAsync(jwt)
    }
}