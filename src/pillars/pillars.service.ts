import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DesksService } from '../desks/desks.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CreatePillarDto } from './dto/create-pillar.dto';
import { UpdatePillarDto } from './dto/update-pillar.dto';
import { Pillar } from './entities/pillar.entity';
import { Card } from '../cards/entities/card.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class PillarsService {
  constructor(
    @InjectRepository(Pillar)
    private pillarRepository: Repository<Pillar>,
    private userService: UsersService,
    private deskService: DesksService
  ) {}

  async create(createPillarDto: CreatePillarDto): Promise<Pillar> {
    const user = await this.userService.findOne(createPillarDto.authorId);
    const desk = await this.deskService.findOne(createPillarDto.deskId);

    const pillar = new Pillar();
    pillar.title = createPillarDto.title;
    pillar.author = user;
    pillar.desk = desk;

    return this.pillarRepository.save(pillar);
  }

  async findAll(): Promise<Pillar[]> {
    return this.pillarRepository.find();
  }

  async findOne(id: string) {
    return this.pillarRepository.findOne(id, {relations: ['auhtor']});
  }

  async findCardsByPillarId(id: string): Promise<Card[]> {
    const pillar = await this.pillarRepository.findOne(id, {relations: ['cards']});
    return pillar.cards;
  }

  async findAccessibleByPillarId(id: string): Promise<User[]> {
    const pillar = await this.pillarRepository.findOne(id, {relations: ['desk', 'desk.accessibleUsers']});
    return pillar.desk.accessibleUsers;
  }

  async update(id: string, updatePillarDto: UpdatePillarDto): Promise<void> {
    await this.pillarRepository.update(id, updatePillarDto);
  }

  async remove(id: string): Promise<void> {
    await this.pillarRepository.delete(id);
  }
}
