import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Desk } from "../entities/desk.entity";

export class DeskDto {
  constructor(desk: Desk) {
    this.id = desk.id;
    this.title = desk.title;
  }

  id: string;
  title: string;
}

@Injectable()
export class DeskTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<DeskDto | DeskDto[]> {
    return next
      .handle()
      .pipe(
        map(
          res => Array.isArray(res) ? res.map(desk => new DeskDto(desk)) : new DeskDto(res)  
        )
      );
  }
}