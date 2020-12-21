import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { PillarsService } from "../pillars.service";

@Injectable()
export class PillarGuard implements CanActivate {
  constructor(private pillarService: PillarsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const pillar = await this.pillarService.findOne(req.params.id);

    return !!(pillar && pillar.author.id === req.user.id);
  }
}