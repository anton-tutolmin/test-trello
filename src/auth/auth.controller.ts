import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login() {
    return '';
  }

  @Post('register')
  async register() {
    return '';
  }

  @Get('profile')
  profile() {
    return '';
  }
}
