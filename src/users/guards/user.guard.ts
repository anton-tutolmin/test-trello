import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";

@Injectable()
export class UserGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    return req.params.id === req.user.id;
  }
}