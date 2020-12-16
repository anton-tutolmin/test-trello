import { Controller, Get, Post, Body, Param, Put, Delete, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUserDto } from "./dto/get-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { UserGuard } from "./guards/user.guard";
import { UserService } from "./users.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetPillarDto } from "src/pillars/dto/get-pillar.dto";

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
  ) {}

  @Get()
  @ApiOperation({summary: 'return array of user dtos'})
  @ApiResponse({status: 200, description: 'success response', type: [GetUserDto]})
  async getAll(): Promise<GetUserDto[]> {
    const users: User[] = await this.userService.getAll();
    return users.map((user) => new GetUserDto(user));
  }
  
  @Get(':id')
  @UseGuards(JwtAuthGuard, UserGuard)
  @ApiOperation({summary: 'return user dto'})
  @ApiResponse({status: 200, description: 'success response', type: [GetUserDto]})
  @ApiResponse({status: 403, description: 'faild jwt auth or different ids'})
  async getById(@Param('id') id: string): Promise<GetUserDto> {
    return new GetUserDto(await this.userService.getById(id));
  }

  @Get(':id/pillars')
  @UseGuards(JwtAuthGuard, UserGuard)
  @ApiOperation({summary: 'return array of pillar dtos by user id'})
  @ApiResponse({status: 200, description: 'success response', type: [GetPillarDto]})
  @ApiResponse({status: 403, description: 'faild jwt auth or different ids'})
  async getPillarsByUserId(@Param('id') id: string): Promise<GetPillarDto[]> {
    const pillars = await this.userService.getPillarsByUserId(id);
    return pillars.map(p => new GetPillarDto(p));
  }
  
  @Post()
  @ApiOperation({summary: 'create user'})
  @ApiResponse({status: 201, description: 'success response', type: GetUserDto})
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, UserGuard)
  @ApiOperation({summary: 'update user'})
  @ApiResponse({status: 200, description: 'success response'})
  @ApiResponse({status: 403, description: 'faild jwt auth or different ids'})
  async updateById(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto
    ): Promise<string> {
    await this.userService.updateById(id, updateUserDto);
    return 'Usert is updated';
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, UserGuard)
  @ApiOperation({summary: 'delete user'})
  @ApiResponse({status: 200, description: 'success response'})
  @ApiResponse({status: 403, description: 'faild jwt auth or different ids'})
  async deleteById(@Param('id') id: string): Promise<string> {
    await this.userService.deleteById(id);
    return 'User is deleted';
  }
}