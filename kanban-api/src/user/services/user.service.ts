/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from 'src/auth/services/auth.services';
import { UserI } from '../user.interface';


@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>,
              private authService: AuthService) {

  }

  async create(newUser: UserI): Promise<UserI> {
    const emailExists: boolean = await this.mailExists(newUser.email)
    const userNameExists: boolean = await this.userNameExists(newUser.username)

    if(emailExists === false && userNameExists === false) {
      const passwordHash: string = await this.authService.hashPassword(newUser.password)
      newUser.password = passwordHash
      newUser.email = newUser.email.toLocaleLowerCase()
      newUser.username = newUser.username.toLocaleLowerCase()

      const user = await this.userRepository.save(this.userRepository.create(newUser))
      return this.findOne(user.id)

    } else {
      throw new HttpException('Email ou usuário já existem', HttpStatus.CONFLICT)
    }
  }

  async login(user: UserI): Promise<string> {
    const foundUser: UserI = await this.findByEmail(user.email)

    if(foundUser) {
      const passwordMatching: boolean = await this.authService.comparePasswords(user.password, foundUser.password)

      if(passwordMatching === true ) {
        const payload: UserI = await this.findOne(foundUser.id)
        return this.authService.generateJwt(payload)
      } else {
        throw new HttpException('O Login falhou, verifique suas credenciais', HttpStatus.UNAUTHORIZED)
      }

    } else {
      throw new HttpException('Usuário não encontrado', HttpStatus.NOT_FOUND)
    }
  }

  private async findByEmail(email: string): Promise<UserI> {
    return this.userRepository.findOne({
      where: {email},
      select: ['id', 'email', 'password', 'username']
    })

  }

  private async findOne(id: number): Promise<UserI> {
    return this.userRepository.findOne({
      where: {id}
    })
  }

  private async mailExists(email: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {email}
    });
    return !!user
  }

  private async userNameExists(username: string): Promise<boolean> {
    const user = await this.userRepository.findOne({
      where: {username}
    })
    return !!user
  }
  
}
