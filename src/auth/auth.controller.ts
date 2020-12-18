import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtGuard } from './guards/jwt.guard';
import { LoginGuard } from './guards/login.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LoginGuard)
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register() {
    return '';
  }

  @Get('profile')
  @UseGuards(JwtGuard)
  profile(@Request() req) {
    return req.user;
  }
}
