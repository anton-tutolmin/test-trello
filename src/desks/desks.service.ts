import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CreateDeskDto } from './dto/create-desk.dto';
import { UpdateDeskDto } from './dto/update-desk.dto';
import { Desk } from './entities/desk.entity';
import { Pillar } from '../pillars/entities/pillar.entity';
import { UserAccessibleDto } from './dto/userAccessible.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DesksService {
  constructor(
    @InjectRepository(Desk)
    private deskRepository: Repository<Desk>,
    private userService: UsersService
  ) {}

  async create(createDeskDto: CreateDeskDto): Promise<Desk> {
    const user = await this.userService.findOne(createDeskDto.authorId);

    if (!user) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: "User with such id is not exist"
      }, HttpStatus.NOT_FOUND);
    }
    
    const desk = new Desk();
    desk.title = createDeskDto.title;
    desk.author = user;
    desk.accessibleUsers = [user];

    return this.deskRepository.save(desk);
  }

  async findAll(): Promise<Desk[]> {
    return this.deskRepository.find();
  }

  async findOne(id: string): Promise<Desk> {
    return this.deskRepository.findOne(id, {relations: ['author']});
  }

  async findPillarsByDeskId(id: string): Promise<Pillar[]> {
    const desk = await this.deskRepository.findOne(id, {relations: ['pillars']});
    return desk.pillars;
  }

  async findAccessibleByDeskId(id: string): Promise<User[]> {
    const desk = await this.deskRepository.findOne(id, {relations: ['accessibleUsers']});
    return desk.accessibleUsers;
  }

  async update(id: string, updateDeskDto: UpdateDeskDto): Promise<void> {
    await this.deskRepository.update(id, updateDeskDto);
  }

  async addUserAccessible(id: string, UserAccessibleDto: UserAccessibleDto): Promise<void> {
    const user = await this.userService.findOne(UserAccessibleDto.userId);
    const desk = await this.deskRepository.findOne(id, {relations: ['accessibleUsers']});

    desk.accessibleUsers.push(user);

    await this.deskRepository.save(desk);
  }

  async removeUserAccessible(id: string, userAccessibleDto: UserAccessibleDto): Promise<void> {
    const desk = await this.deskRepository.findOne(id, {relations: ['accessibleUsers']});

    desk.accessibleUsers = desk.accessibleUsers.filter(u => u.id !== userAccessibleDto.userId);

    await this.deskRepository.save(desk);
  }

  async remove(id: string): Promise<void> {
    await this.deskRepository.delete(id);
  }
}
