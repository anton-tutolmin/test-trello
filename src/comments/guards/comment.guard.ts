import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CommentsService } from "../comments.service";

@Injectable()
export class CommentGuard implements CanActivate {
  constructor(private commentService: CommentsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const comment = await this.commentService.findOne(req.params.id);
    
    return comment.author.id === req.user.id;
  }
}