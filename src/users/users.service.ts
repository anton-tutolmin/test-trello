import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pillar } from "src/pillars/entities/pillar.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.save(createUserDto)
  }

  async getAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async getById(id: string): Promise<User>  {
    return this.userRepository.findOne(id);
  }

  async getByEmail(email: string): Promise<User> {
    return this.userRepository.findOne({email});
  }

  async getPillarsByUserId(id: string): Promise<Pillar[]> {
    const user = await this.userRepository.findOne(id, {relations: ['pillars']});
    return user.pillars;
  }

  async updateById(id: string, updateUserDto: UpdateUserDto): Promise<void> {
    await this.userRepository.update(id, updateUserDto);
  }

  async deleteById(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}