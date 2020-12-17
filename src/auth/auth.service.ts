import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { HashService } from "../hash/hash.service";
import { CreateUserDto } from "../users/dto/create-user.dto";
import { User } from "../users/entities/user.entity";
import { UserService } from "../users/users.service";

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService
  ) {}

  async validateLogin(email: string, password: string): Promise<User> {
    const user: User = await this.userService.getByEmail(email);

    if (!user) {
      throw new UnauthorizedException;
    }

    const isValidPassword = await this.hashService.verifyPassword(user.password, password);

    if (!isValidPassword) {
      throw new UnauthorizedException;
    }

    return user;
  }

  async login(user: User) {
    const payload = { id: user.id, username: user.username, email: user.email };
    return this.jwtService.sign(payload);
  }

  async register(createUserDto: CreateUserDto): Promise<string> {
    createUserDto.password = await this.hashService.hashPassword(createUserDto.password);

    const user: User = await this.userService.create(createUserDto);
    const payload = { id: user.id, username: user.username, email: user.email };

    return this.jwtService.sign(payload);
  }

  async getProfile(id: string) {
    return this.userService.getById(id);
  } 
}