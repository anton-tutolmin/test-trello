import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DesksService } from './desks.service';
import { CreateDeskDto } from './dto/create-desk.dto';
import { UpdateDeskDto } from './dto/update-desk.dto';
import { Desk } from './entities/desk.entity';

@ApiTags('desks')
@ApiBearerAuth()
@Controller('desks')
export class DesksController {
  constructor(private readonly desksService: DesksService) {}

  @Post()
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
  @ApiOperation({summary: 'get desk by id'})
  @ApiResponse({status: 200, description: 'success response'})
  async findOne(@Param('id') id: string): Promise<Desk> {
    return this.desksService.findOne(id);
  }

  @Get(':id/pillars')
  @ApiOperation({summary: 'get pillars by desk id'})
  @ApiResponse({status: 200, description: 'success response'})
  async findPillarsByDeskId(@Param('id') id: string) {
    return this.desksService.findPillarsByDeskId(id);
  }

  @Put(':id')
  @ApiOperation({summary: 'update desk by id'})
  @ApiResponse({status: 204, description: 'desk successfully updated'})
  async update(@Param('id') id: string, @Body() updateDeskDto: UpdateDeskDto): Promise<string> {
    await this.desksService.update(id, updateDeskDto);
    return 'Desk is updated';
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete desk by id'})
  @ApiResponse({status: 204, description: 'desk successfully deleted'})
  async remove(@Param('id') id: string) {
    await this.desksService.remove(id);
    return 'desk is deleted';
  }
}