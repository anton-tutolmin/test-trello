import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { PillarsService } from './pillars.service';
import { CreatePillarDto } from './dto/create-pillar.dto';
import { UpdatePillarDto } from './dto/update-pillar.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Pillar } from './entities/pillar.entity';
import { Card } from '../cards/entities/card.entity';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CreatePillarGuard } from './guards/create-pillar.guard';
import { PillarAcessibleGuard } from './guards/pillar-accessible.guard';
import { PillarGuard } from './guards/pillar.guard';


@ApiTags('pillars')
@ApiBearerAuth()
@Controller('pillars')
export class PillarsController {
  constructor(private readonly pillarsService: PillarsService) {}

  @Post()
  @UseGuards(JwtGuard, CreatePillarGuard)
  @ApiOperation({summary: 'create pillar'})
  @ApiResponse({status: 201, description: 'pillar successfully created'})
  async create(@Body() createPillarDto: CreatePillarDto): Promise<Pillar> {
    return this.pillarsService.create(createPillarDto);
  }

  @Get()
  @ApiOperation({summary: 'get pillar array'})
  @ApiResponse({status: 200, description: 'success response'})
  async findAll(): Promise<Pillar[]> {
    return this.pillarsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard, PillarAcessibleGuard)
  @ApiOperation({summary: 'get pillar by id'})
  @ApiResponse({status: 200, description: 'success response'})
  async findOne(@Param('id') id: string): Promise<Pillar> {
    return this.pillarsService.findOne(id);
  }

  @Get(':id/cards')
  @UseGuards(JwtGuard, PillarAcessibleGuard)
  @ApiOperation({summary: 'get card array by pillar id'})
  @ApiResponse({status: 200, description: 'success response'})
  async findCardsByPillarId(@Param('id') id: string): Promise<Card[]> {
    return this.pillarsService.findCardsByPillarId(id);
  }

  @Put(':id')
  @UseGuards(JwtGuard, PillarGuard)
  @ApiOperation({summary: 'update pillar by id'})
  @ApiResponse({status: 204, description: 'pillar successfully updated'})
  async update(@Param('id') id: string, @Body() updatePillarDto: UpdatePillarDto): Promise<string> {
    await this.pillarsService.update(id, updatePillarDto);
    return 'Pillar is updated';
  }

  @Delete(':id')
  @UseGuards(JwtGuard, PillarGuard)
  @ApiOperation({summary: 'delete pillar by id'})
  @ApiResponse({status: 204, description: 'pillar successfully deleted'})
  async remove(@Param('id') id: string): Promise<string> {
    await this.pillarsService.remove(id);
    return 'Pillar is deleted';
  }
}
