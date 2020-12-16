import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { CardService } from "../card.service";

@Injectable()
export class CardGuard implements CanActivate {
  constructor(private cardService: CardService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const card = await this.cardService.getById(req.params.id);
    
    return card.author.id === req.user.id;
  }
}