import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { HashService } from './hash.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private hashService: HashService,
    private jwtService: JwtService
    ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findOneByEmail(email);

    if (!user || await this.hashService.validatePassword(user.password, password)) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async login({username, id}): Promise<any> {
    return {
      token: this.jwtService.sign({username, id}),
    }
  }

  async register(createUserDto: CreateUserDto): Promise<any> {
    const user = await this.userService.create(createUserDto);
    return {
      token: this.jwtService.sign({id: user.id, username: user.username}),
    };
  }

  async profile(id: string): Promise<User> {
    return this.userService.findOne(id);
  }
}
