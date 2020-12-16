import { ExecutionContext, Injectable } from "@nestjs/common";
import { CanActivate } from "@nestjs/common";
import { Pillar } from "../entities/pillar.entity";
import { PillarService } from "../pillar.service";

@Injectable()
export class PillarGuard implements CanActivate {
  constructor(private pillarService: PillarService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const pillar: Pillar = await this.pillarService.getById(req.params.id);
    return pillar.author.id === req.user.id;
  }
}