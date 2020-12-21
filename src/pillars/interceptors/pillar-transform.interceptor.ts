import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Pillar } from "../entities/pillar.entity";

export class PillarDto {
  constructor(pillar: Pillar) {
    this.id = pillar.id;
    this.title = pillar.title;
  }

  id: string;
  title: string;
}

@Injectable()
export class PillarTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<PillarDto | PillarDto[]> {
    return next
      .handle()
      .pipe(
        map(
          res => Array.isArray(res) ? res.map(pillar => new PillarDto(pillar)) : new PillarDto(res)          
        ),
      );
  }
}