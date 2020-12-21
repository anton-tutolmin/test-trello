import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Card } from "../entities/card.entity";


export class CardDto {
  constructor(card: Card) {
    this.id = card.id;
    this.title = card.title;
    this.description = card.description;
  }
  
  id: string;
  title: string;
  description: string;
}

@Injectable()
export class CardTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<CardDto | CardDto[]> {
    return next
      .handle()
      .pipe(
        map(
          res => Array.isArray(res) ? res.map(card => new CardDto(card)) : new CardDto(res)
        ),
      );
  }
}