import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Card } from "../cards/entities/card.entity";
import { UserService } from "../users/users.service";
import { Repository } from "typeorm";
import { CreatePillarDto } from "./dto/create-pillar.dto";
import { UpdatePillarDto } from "./dto/update-pillar.dto";
import { Pillar } from "./entities/pillar.entity";

@Injectable()
export class PillarService {
  constructor(
    @InjectRepository(Pillar)
    private pillarRepository: Repository<Pillar>,
    private userService: UserService
  ) {}
  
  async getAll(): Promise<Pillar[]>  {
    return this.pillarRepository.find();
  }
  
  async getById(id: string): Promise<Pillar>  {
    return this.pillarRepository.findOne(id, {relations: ['author']});
  }

  async getCardsByPillarId(id: string): Promise<Card[]> {
    const pillar = await this.pillarRepository.findOne(id, {relations: ['cards']});
    return pillar.cards;
  }

  async create(createPillarDto: CreatePillarDto): Promise<Pillar> {
    const user = await this.userService.getById(createPillarDto.authorId);

    if (!user) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User with such id is not exists',
      }, HttpStatus.NOT_FOUND);
    }

    const pillar = new Pillar();

    pillar.title = createPillarDto.title;
    pillar.author = user;

    return this.pillarRepository.save(pillar);
  }

  async updateById(id: string, updatePillarDto: UpdatePillarDto): Promise<void> {
    await this.pillarRepository.update(id, updatePillarDto);
  }

  async deleteById(id: string): Promise<void> {
    await this.pillarRepository.delete(id);
  }
}