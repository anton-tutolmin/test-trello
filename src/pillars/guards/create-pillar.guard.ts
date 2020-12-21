import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { DesksService } from "../../desks/desks.service";

@Injectable()
export class CreatePillarGuard implements CanActivate {
  constructor(private deskService: DesksService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const accessibleUsers = await this.deskService.findAccessibleByDeskId(req.body.deskId);

    return !!(accessibleUsers && accessibleUsers.find(u => u.id === req.user.id));
  }
}