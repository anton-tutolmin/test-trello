import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PillarsService } from '../pillars/pillars.service';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { Comment } from '../comments/entities/comment.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { MoveCardDto } from './dto/move-card.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private userService: UsersService,
    private pillarService: PillarsService,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const user = await this.userService.findOne(createCardDto.authorId);
    const pillar = await this.pillarService.findOne(createCardDto.pillarId);

    const card = new Card();
    card.title = createCardDto.title;
    card.description = createCardDto.description;
    card.author = user;
    card.pillar = pillar;

    return this.cardRepository.save(card);
  }

  async findAll(): Promise<Card[]> {
    return this.cardRepository.find();
  }

  async findOne(id: string): Promise<Card> {
    return this.cardRepository.findOne(id, {relations: ['author']});
  }

  async findCommentByCardId(id: string): Promise<Comment[]> {
    const card = await this.cardRepository.findOne(id);
    return card.comments;
  }

  async findAccessibleByCardId(id: string): Promise<User[]> {
    const card = await this.cardRepository.findOne(id, {relations: ['pillar', 'pillar.desk', 'pillar.desk.accessibleUsers']});
    return card.pillar.desk.accessibleUsers;
  }

  async moveCard(id: string, moveCardDto: MoveCardDto): Promise<Card> {
    const pillar = await this.pillarService.findOne(moveCardDto.pillarId);
    const card = await this.cardRepository.findOne(id);

    card.pillar = pillar;

    return this.cardRepository.save(card);
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<void> {
    await this.cardRepository.update(id, updateCardDto);
  }

  async remove(id: string): Promise<void> {
    await this.cardRepository.delete(id);
  }
}
