import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CommentService } from "../comment.service";

@Injectable()
export class CommentGuard implements CanActivate {
  constructor(private commentService: CommentService) {}
  
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const comment = await this.commentService.getById(req.params.id);
    
    return comment.author.id === req.user.id;
  }
}