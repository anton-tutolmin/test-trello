import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { DesksService } from "../desks.service";

@Injectable()
export class AccessibleGuard implements CanActivate {
  constructor(private deskService: DesksService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const accessibleUsers = await this.deskService.findAccessibleByDeskId(req.params.id);

    return !!(accessibleUsers && accessibleUsers.find(u => u.id === req.user.id));
  }
}