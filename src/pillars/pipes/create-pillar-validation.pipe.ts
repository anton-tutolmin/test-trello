import { HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { DesksService } from "../../desks/desks.service";
import { UsersService } from "../../users/users.service";

@Injectable()
export class CreatePillarValidationPipe implements PipeTransform {
  constructor(private userService: UsersService, private deskService: DesksService) {}

  async transform(value: any) {
    if (!(await this.userService.findOne(value.authorId))) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'User with such id is not exist',
      }, HttpStatus.NOT_FOUND)
    }
    if (!(await this.deskService.findOne(value.deskId))) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Desk with such id is not exist',
      }, HttpStatus.NOT_FOUND)
    }
  }
}