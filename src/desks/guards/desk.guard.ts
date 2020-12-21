import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { DesksService } from "../desks.service";

@Injectable()
export class DeskGuard implements CanActivate {
  constructor(private deskService: DesksService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const desk = await this.deskService.findOne(req.params.id);

    return !!(desk && desk.author.id === req.user.id);
  }
}