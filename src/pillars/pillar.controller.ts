import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetCardDto } from "src/cards/dto/get-card.dto";
import { CreatePillarDto } from "./dto/create-pillar.dto";
import { GetPillarDto } from "./dto/get-pillar.dto";
import { UpdatePillarDto } from "./dto/update-pillar.dto";
import { PillarGuard } from "./guards/pillar.guard";
import { PillarService } from "./pillar.service";

@ApiTags('pillars')
@ApiBearerAuth()
@Controller('pillars')
export class PillarController {
  constructor(private pillarService: PillarService) {}

  @Get()
  @ApiOperation({summary: 'return array of pillar dtos'})
  @ApiResponse({status: 200, description: 'success response', type: [GetPillarDto]})
  async getAll(): Promise<GetPillarDto[]> {
    const pillars = await this.pillarService.getAll();
    return pillars.map(p => new GetPillarDto(p));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({summary: 'return pillar dto'})
  @ApiResponse({status: 200, description: 'success response', type: GetPillarDto})
  @ApiResponse({status: 403, description: 'faild jwt auth'})
  async getById(@Param('id') id: string): Promise<GetPillarDto> {
    return new GetPillarDto(await this.pillarService.getById(id));
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id/cards')
  @ApiOperation({summary: 'return array of cards dtos by pillar id'})
  @ApiResponse({status: 200, description: 'success response', type: [GetPillarDto]})
  @ApiResponse({status: 403, description: 'faild jwt auth'})
  async getCardsByPillarsId(@Param('id') id: string): Promise<GetCardDto[]> {
    const cards = await this.pillarService.getCardsByPillardsId(id);
    return cards.map(c => new GetCardDto(c));
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  @ApiOperation({summary: 'create pillar'})
  @ApiResponse({status: 201, description: 'success response', type: GetPillarDto})
  @ApiResponse({status: 403, description: 'faild jwt auth'})
  async create(@Body() createPillarDto: CreatePillarDto): Promise<GetPillarDto> {
    return new GetPillarDto(await this.pillarService.create(createPillarDto));
  }

  @UseGuards(JwtAuthGuard, PillarGuard)
  @Put(':id')
  @ApiOperation({summary: 'update pillar by id'})
  @ApiResponse({status: 204, description: 'success response'})
  @ApiResponse({status: 403, description: 'faild jwt auth or different ids'})
  async updateById(
    @Param('id') id: string,
    @Body() updatePillarnDto: UpdatePillarDto
    ): Promise<string> {
      await this.pillarService.updateById(id, updatePillarnDto);
      return 'Pillar is updated';
  }

  @UseGuards(JwtAuthGuard, PillarGuard)
  @Delete(':id')
  @ApiOperation({summary: 'delete pillar by id'})
  @ApiResponse({status: 204, description: 'success response'})
  @ApiResponse({status: 403, description: 'faild jwt auth or different ids'})
  async deleteById(@Param('id') id: string): Promise<string> {
    await this.pillarService.deleteById(id);
    return 'Pillar is deleted';
  }
}