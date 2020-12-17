import { Controller, Post, UseGuards, Request, Get, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LocalAuthGuard } from "./guards/local-auth.guard";
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CreateUserDto } from "../users/dto/create-user.dto";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AuthTokenDto } from "./dto/auth-token.dto";
import { GetUserDto } from "../users/dto/get-user.dto";

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('login')
  @UseGuards(LocalAuthGuard)
  @ApiOperation({summary: 'login'})
  @ApiResponse({status: 200, description: 'success response', type: AuthTokenDto})
  async login(@Request() req): Promise<AuthTokenDto> {
    return new AuthTokenDto(await this.authService.login(req.user));
  }

  @Post('register')
  @ApiOperation({summary: 'register'})
  @ApiResponse({status: 201, description: 'success response', type: AuthTokenDto})
  async register(@Body() createUserDto: CreateUserDto): Promise<AuthTokenDto> {
    return new AuthTokenDto(await this.authService.register(createUserDto));
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'return user dto'})
  @ApiResponse({status: 200, description: 'success response', type: GetUserDto})
  @ApiResponse({status: 403, description: 'faild jwt auth'})
  async getProfile(@Request() req): Promise<GetUserDto> {
    return new GetUserDto(await this.authService.getProfile(req.user.id));
  }
}