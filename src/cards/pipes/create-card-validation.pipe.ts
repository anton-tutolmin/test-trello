import { HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { PillarsService } from "../../pillars/pillars.service";
import { UsersService } from "../../users/users.service";

@Injectable()
export class CreateCardValidationPipe implements PipeTransform {
  constructor(private userService: UsersService, private pillarService: PillarsService) {}

  async transform(value: any) {
    if (!(await this.userService.findOne(value.authorId))) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User with such id is not exist',
      }, HttpStatus.NOT_FOUND);
    }
    if (!(await this.pillarService.findOne(value.pillarId))) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Pillar with such id is not exist',
      }, HttpStatus.NOT_FOUND)
    }

    return value;
  }
}