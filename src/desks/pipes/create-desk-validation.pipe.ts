import { HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { UsersService } from "../../users/users.service";

@Injectable()
export class CreateDeskValidationPipe implements PipeTransform {
  constructor(private userService: UsersService) {}

  async transform(value: any) {
    if (!(await this.userService.findOne(value.authorId))) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: "Desk with such id is not exist"
      }, HttpStatus.NOT_FOUND);
    }
    return value;
  }
}