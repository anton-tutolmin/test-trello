import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CardsService } from 'src/cards/cards.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
    private userService: UsersService,
    private cardService: CardsService,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const user = await this.userService.findOne(createCommentDto.authorId);
    const card = await this.cardService.findOne(createCommentDto.cardId);

    if (!user) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User with such id is not exist',
      }, HttpStatus.NOT_FOUND)
    }

    if (!card) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Card with such id is not exist',
      }, HttpStatus.NOT_FOUND)
    }

    const comment = new Comment();
    comment.author = user;
    comment.card = card;

    return this.commentRepository.save(comment);
  }

  async findAll(): Promise<Comment[]> {
    return this.commentRepository.find();
  }

  async findOne(id: string): Promise<Comment> {
    return this.commentRepository.findOne(id);
  }

  async update(id: string, updateCommentDto: UpdateCommentDto): Promise<void> {
    await this.commentRepository.update(id, updateCommentDto);
  }

  async remove(id: string): Promise<void> {
    await this.commentRepository.delete(id);
  }
}
