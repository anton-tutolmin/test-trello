import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { PillarsService } from "../pillars.service";

@Injectable()
export class PillarAcessibleGuard implements CanActivate {
  constructor(private pillarService: PillarsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const accessibleUsers = await this.pillarService.findAccessibleByPillarId(req.params.id);

    return !!(accessibleUsers && accessibleUsers.find(u => u.id === req.user.id));
  }
}