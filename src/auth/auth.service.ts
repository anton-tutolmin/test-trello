import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { HashService } from './hash.service';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';

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

  async login({username, id}) {
    return {
      token: this.jwtService.sign({username, id}),
    }
  }

  async register() {
    return `This action returns all auth`;
  }

  async profile() {
    return `This action returns a auth`;
  }
}
