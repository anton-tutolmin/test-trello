import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { UsersService } from "../../users/users.service";
import { DesksService } from "../desks.service";

@Injectable()
export class AccessibleValidationPipe implements PipeTransform {
  constructor(private deskService: DesksService, private userService: UsersService) {}
  async transform(value: any, metadata: ArgumentMetadata) {
    
    if (metadata.type === 'param' && !(await this.deskService.findOne(value))) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: "Desk with such id is not exist"
      }, HttpStatus.NOT_FOUND);
    } else if (metadata.type === 'body' && !(await this.userService.findOne(value.userId))) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: "User with such id is not exist"
      }, HttpStatus.NOT_FOUND);
    }

    return value;
  }
}