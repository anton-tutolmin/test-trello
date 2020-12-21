import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Desk } from '../desks/entities/desk.entity';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserGuard } from './guards/user.guard';
import { UserTransformInterceptor, UserDto } from './interceptors/user-transform.interceptor';
import { DeskTransformInterceptor, DeskDto } from '../desks/interceptors/desk-transform.interceptor';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseInterceptors(UserTransformInterceptor)
  @ApiOperation({summary: 'create user'})
  @ApiResponse({status: 201, description: 'user successfully created', type: UserDto})
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseInterceptors(UserTransformInterceptor)
  @ApiOperation({summary: 'get user array'})
  @ApiResponse({status: 200, description: 'success response', type: [UserDto]})
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard, UserGuard)
  @UseInterceptors(UserTransformInterceptor)
  @ApiOperation({summary: 'get user by id'})
  @ApiResponse({status: 200, description: 'success response', type: UserDto})
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get(':id/desks')
  @UseGuards(JwtGuard, UserGuard)
  @UseInterceptors(DeskTransformInterceptor)
  @ApiOperation({summary: 'return desks by user id'})
  @ApiResponse({status: 200, description: 'success response', type: [DeskDto]})
  async findDesksByUserId(@Param('id') id: string): Promise<Desk[]> {
    return this.usersService.findDesksByUserId(id);
  }

  @Get(':id/accessible_desks')
  @UseGuards(JwtGuard, UserGuard)
  @UseInterceptors(DeskTransformInterceptor)
  @ApiOperation({summary: 'return accessible desks by user id'})
  @ApiResponse({status: 200, description: 'success response', type: [DeskDto]})
  async findAccessibleDesksByUserId(@Param('id') id: string): Promise<Desk[]> {
    return this.usersService.findAccessibleDesksByUserId(id);
  }

  @Put(':id')
  @UseGuards(JwtGuard, UserGuard)
  @ApiOperation({summary: 'update user by id'})
  @ApiResponse({status: 204, description: 'user successfully updated'})
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<string> {
    await this.usersService.update(id, updateUserDto);
    return 'User is updated';
  }

  @Delete(':id')
  @UseGuards(JwtGuard, UserGuard)
  @ApiOperation({summary: 'delete user by id'})
  @ApiResponse({status: 200, description: 'user successfully deleted'})
  async remove(@Param('id') id: string): Promise<string> {
    await this.usersService.remove(id);
    return 'User is deleted';
  }
}
