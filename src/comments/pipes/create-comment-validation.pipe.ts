import { HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { CardsService } from "../../cards/cards.service";
import { UsersService } from "../../users/users.service";

@Injectable()
export class CreateCommentValidationPipe implements PipeTransform {
  constructor(private userService: UsersService, private cardService: CardsService) {}

  async transform(value: any) {
    if (!(await this.userService.findOne(value.authorId))) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User with such id is not exist',
      }, HttpStatus.NOT_FOUND);
    }
    if (!(await this.cardService.findOne(value.cardId))) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Card with such id is not exist',
      }, HttpStatus.NOT_FOUND);
    }

    return value;
  }
}