import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map} from "rxjs/operators";
import { Comment } from "../entities/comment.entity";

export class CommentDto {
  constructor(comment: Comment) {
    this.id = comment.id;
    this.text = comment.text;
    this.authorname = comment.author.username;
  }
  
  id: string;
  text: string;
  authorname: string;
}

@Injectable()
export class CommentTransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<CommentDto | CommentDto[]> {
    return next
      .handle()
      .pipe(
        map(
          res => Array.isArray(res) ? res.map(comment => new CommentDto(comment)) : new CommentDto(res)
        ),
      );
  }
}