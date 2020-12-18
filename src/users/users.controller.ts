import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Desk } from '../desks/entities/desk.entity';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({summary: 'create user'})
  @ApiResponse({status: 201, description: 'user successfully created'})
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({summary: 'get user array'})
  @ApiResponse({status: 200, description: 'success response'})
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'get user by id'})
  @ApiResponse({status: 200, description: 'success response'})
  async findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(id);
  }

  @Get(':id/desks')
  @ApiOperation({summary: 'return desks by user id'})
  @ApiResponse({status: 200, description: 'success response'})
  async findDesksByUserId(@Param('id') id: string): Promise<Desk[]> {
    return this.usersService.findDesksByUserId(id);
  }

  @Get(':id/accessible_desks')
  @ApiOperation({summary: 'return accessible desks by user id'})
  @ApiResponse({status: 200, description: 'success response'})
  async findAccessibleDesksByUserId(@Param('id') id: string): Promise<Desk[]> {
    return this.usersService.findAccessibleDesksByUserId(id);
  }

  @Put(':id')
  @ApiOperation({summary: 'update user by id'})
  @ApiResponse({status: 204, description: 'user successfully updated'})
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<string> {
    await this.usersService.update(id, updateUserDto);
    return 'User is updated';
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete user by id'})
  @ApiResponse({status: 200, description: 'user successfully deleted'})
  async remove(@Param('id') id: string): Promise<string> {
    await this.usersService.remove(id);
    return 'User is deleted';
  }
}
