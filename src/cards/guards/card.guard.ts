import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CardsService } from "../cards.service";

@Injectable()
export class CardGuard implements CanActivate {
  constructor(private cardService: CardsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const card = await this.cardService.findOne(req.params.id);

    return !!(card && card.author.id === req.user.id);
  }
}