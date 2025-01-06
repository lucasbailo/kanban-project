/* eslint-disable prettier/prettier */

// com o dtos podemos verificar se o payload que o usuário envia preenche nossas condições, por exemplo, se o mail é um email
import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginUserDto {

    
    @IsEmail()
    email: string;

    @IsNotEmpty()
    password: string;


}