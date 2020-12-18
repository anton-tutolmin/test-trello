import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { PillarsService } from './pillars.service';
import { CreatePillarDto } from './dto/create-pillar.dto';
import { UpdatePillarDto } from './dto/update-pillar.dto';

@Controller('pillars')
export class PillarsController {
  constructor(private readonly pillarsService: PillarsService) {}

  @Post()
  create(@Body() createPillarDto: CreatePillarDto) {
    return this.pillarsService.create(createPillarDto);
  }

  @Get()
  findAll() {
    return this.pillarsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pillarsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updatePillarDto: UpdatePillarDto) {
    return this.pillarsService.update(+id, updatePillarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pillarsService.remove(+id);
  }
}
