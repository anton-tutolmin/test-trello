import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CommentsService } from "../comments.service";

@Injectable()
export class CommentAccessibleGuard implements CanActivate {
  constructor(private commentService: CommentsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {

    const req = context.switchToHttp().getRequest();
    
    const accessibleUsers = await this.commentService.findAccessibleByCommentId(req.params.id);

    return !!(accessibleUsers && accessibleUsers.find(u => u.id === req.user.id));
  }
}