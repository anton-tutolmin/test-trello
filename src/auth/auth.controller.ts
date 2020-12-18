import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(AuthGuard('login'))
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async register() {
    return '';
  }

  @Get('profile')
  @UseGuards(AuthGuard('jwt'))
  profile(@Request() req) {
    return req.user;
  }
}
