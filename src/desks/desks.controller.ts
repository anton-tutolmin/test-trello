import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { DesksService } from './desks.service';
import { CreateDeskDto } from './dto/create-desk.dto';
import { UpdateDeskDto } from './dto/update-desk.dto';
import { UserAccessibleDto } from './dto/userAccessible.dto';
import { Desk } from './entities/desk.entity';
import { DeskAccessibleGuard } from './guards/desk-accessible.guard';
import { DeskGuard } from './guards/desk.guard';
import { AccessibleValidationPipe } from './pipes/accessible-validation.pipe';

@ApiTags('desks')
@ApiBearerAuth()
@Controller('desks')
export class DesksController {
  constructor(private readonly desksService: DesksService) {}

  @Post()
  @UseGuards(JwtGuard)
  @ApiOperation({summary: 'create desk'})
  @ApiResponse({status: 201, description: 'desk successfully created'})
  async create(@Body() createDeskDto: CreateDeskDto): Promise<Desk> {
    return this.desksService.create(createDeskDto);
  }

  @Get()
  @ApiOperation({summary: 'get desk array'})
  @ApiResponse({status: 200, description: 'success response'})
  async findAll(): Promise<Desk[]> {
    return this.desksService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard, DeskAccessibleGuard)
  @ApiOperation({summary: 'get desk by id'})
  @ApiResponse({status: 200, description: 'success response'})
  async findOne(@Param('id') id: string): Promise<Desk> {
    return this.desksService.findOne(id);
  }

  @Get(':id/pillars')
  @UseGuards(JwtGuard, DeskAccessibleGuard)
  @ApiOperation({summary: 'get pillars by desk id'})
  @ApiResponse({status: 200, description: 'success response'})
  async findPillarsByDeskId(@Param('id') id: string) {
    return this.desksService.findPillarsByDeskId(id);
  }

  @Put(':id')
  @UseGuards(JwtGuard, DeskGuard)
  @ApiOperation({summary: 'update desk by id'})
  @ApiResponse({status: 204, description: 'desk successfully updated'})
  async update(@Param('id') id: string, @Body() updateDeskDto: UpdateDeskDto): Promise<string> {
    await this.desksService.update(id, updateDeskDto);
    return 'Desk is updated';
  }

  @Put(':id/add_access')
  @UseGuards(JwtGuard, DeskGuard)
  @UsePipes(AccessibleValidationPipe)
  @ApiOperation({summary: 'add user in desk accessible list'})
  @ApiResponse({status: 204, description: 'access was successfully added'})
  async addUserAccessible(@Param('id') id: string, @Body() userAccessibleDto: UserAccessibleDto): Promise<string> {
    await this.desksService.addUserAccessible(id, userAccessibleDto);
    return 'User is added in accessible list';
  }

  @Put(':id/remove_access')
  @UseGuards(JwtGuard, DeskGuard)
  @UsePipes(AccessibleValidationPipe)
  @ApiOperation({summary: 'remove user from desk accessible list'})
  @ApiResponse({status: 204, description: 'access was successfully removed'})
  async removeUserAccessible(@Param('id') id: string, @Body() userAccessibleDto: UserAccessibleDto): Promise<string> {
    await this.desksService.removeUserAccessible(id, userAccessibleDto);
    return 'User is removed from accessible list';
  }

  @Delete(':id')
  @UseGuards(JwtGuard, DeskGuard)
  @ApiOperation({summary: 'delete desk by id'})
  @ApiResponse({status: 204, description: 'desk successfully deleted'})
  async remove(@Param('id') id: string) {
    await this.desksService.remove(id);
    return 'desk is deleted';
  }
}
