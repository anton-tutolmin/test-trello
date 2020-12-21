import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CardsService } from "../cards.service";

@Injectable()
export class CardAccessibleGuard implements CanActivate {
  constructor(private cardService: CardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const accessibleUsers = await this.cardService.findAccessibleByCardId(req.params.id);

    return !!(accessibleUsers && accessibleUsers.find(u => u.id === req.user.id));
  }
}