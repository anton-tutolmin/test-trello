import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CardService } from "src/cards/card.service";
import { UserService } from "src/users/users.service";
import { Repository } from "typeorm";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { Comment } from "./entities/comment.entity";

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private userService: UserService,
    private cardService: CardService,
  ) {}

  async getAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async getById(id: string): Promise<Comment> {
    return this.commentRepository.findOne(id, {relations: ['author']});
  }
  
  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const author = await this.userService.getById(createCommentDto.authorId);
    const card = await this.cardService.getById(createCommentDto.cardId);

    if (!author) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User with such id is not exists',
      }, HttpStatus.NOT_FOUND);
    }

    if (!card) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Card with such id is not exists',
      }, HttpStatus.NOT_FOUND);
    }

    const comment = new Comment();

    comment.author = author;
    comment.card = card;
    comment.text = createCommentDto.text;

    return this.commentRepository.save(comment);
  }

  async updateById(id: string, updateCommentDto: UpdateCommentDto): Promise<void> {
    await this.commentRepository.update(id, updateCommentDto);
  }

  async deleteById(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }
}