import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import { User } from "../entities/user.entity";

export class UserDto {
  constructor(user: User) {
    this.username = user.username;
    this.email = user.email;
    this.id = user.id;
  }

  id: string;
  username: string;
  email: string;
}

@Injectable()
export class UserTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<UserDto | UserDto[]> {
    return next
      .handle()
      .pipe(
        map(
          res => Array.isArray(res) ? res.map(user => new UserDto(user)) : new UserDto(res)
        ),
      );
  }
}