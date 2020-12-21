import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CardsService } from "../../cards/cards.service";

@Injectable()
export class CreateCommentGuard implements CanActivate {
  constructor(private cardService: CardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const accessibleUsers = await this.cardService.findAccessibleByCardId(req.body.cardId);

    return !!(accessibleUsers && accessibleUsers.find(u => u.id === req.user.id));
  }
}