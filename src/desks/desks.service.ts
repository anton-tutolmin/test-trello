import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CreateDeskDto } from './dto/create-desk.dto';
import { UpdateDeskDto } from './dto/update-desk.dto';
import { Desk } from './entities/desk.entity';
import { Pillar } from '../pillars/entities/pillar.entity';

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

    return this.deskRepository.save(desk);
  }

  async findAll(): Promise<Desk[]> {
    return this.deskRepository.find();
  }

  async findOne(id: string): Promise<Desk> {
    return this.deskRepository.findOne(id);
  }

  async findPillarsByDeskId(id: string): Promise<Pillar[]> {
    const desk = await this.deskRepository.findOne(id, {relations: ['pillars']});
    return desk.pillars;
  }

  async update(id: string, updateDeskDto: UpdateDeskDto): Promise<void> {
    await this.deskRepository.update(id, updateDeskDto);
  }

  async remove(id: string): Promise<void> {
    await this.deskRepository.delete(id);
  }
}
