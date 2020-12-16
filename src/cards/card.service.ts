import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PillarService } from "src/pillars/pillar.service";
import { UserService } from "src/users/users.service";
import { Repository } from "typeorm";
import { CreateCardDto } from "./dto/create-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { Card } from "./entities/card.entity";
import { Comment } from "src/comments/entities/comment.entity";

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
    private userService: UserService,
    private pillarService: PillarService,
  ) {}

  async getAll(): Promise<Card[]> {
    return this.cardRepository.find();
  }
  
  async getById(id: string): Promise<Card> {
    return this.cardRepository.findOne(id, {relations: ['author']});
  }
  
  async getCommentsByCardId(id: string): Promise<Comment[]> {
    const card = await this.cardRepository.findOne(id, {relations: ['comments']});
    return card.comments;
  }

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const author = await this.userService.getById(createCardDto.authorId);
    const pillar = await this.pillarService.getById(createCardDto.pillarId);

    if (!author) {
      throw Error('No user with such id');
    }

    if (!pillar) {
      throw Error('No pillar with such id');
    }

    const card = new Card();
    card.author = author;
    card.pillar = pillar;
    card.title = createCardDto.title;
    card.description = createCardDto.description;

    return this.cardRepository.save(card);
  }

  async updateById(id: string, updateCardDto: UpdateCardDto): Promise<void> {
    await this.cardRepository.update(id, updateCardDto);
  }

  async deleteById(id: string): Promise<void> {
    await this.cardRepository.delete(id);
  }
}