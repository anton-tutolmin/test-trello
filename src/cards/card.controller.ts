import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { GetCommentDto } from "../comments/dto/get-comment.dto";
import { CardService } from "./card.service";
import { CreateCardDto } from "./dto/create-card.dto";
import { GetCardDto } from "./dto/get-card.dto";
import { UpdateCardDto } from "./dto/update-card.dto";
import { CardGuard } from "./guards/card.guard";

@ApiTags('cards')
@ApiBearerAuth()
@Controller('cards')
export class CardController {
  constructor(private cardService: CardService) {}

  @Get()
  @ApiOperation({summary: 'return array of card dtos'})
  @ApiResponse({status: 200, description: 'success response', type: [GetCardDto]})
  async getAll(): Promise<GetCardDto[]> { 
    const cards = await this.cardService.getAll();
    return cards.map(c => new GetCardDto(c));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'return card dto'})
  @ApiResponse({status: 200, description: 'success response', type: GetCardDto})
  @ApiResponse({status: 403, description: 'faild jwt auth'})
  async getById(@Param('id') id: string): Promise<GetCardDto> {
    return new GetCardDto(await this.cardService.getById(id));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'return array of comments dtos by card id'})
  @ApiResponse({status: 200, description: 'success response', type: [GetCommentDto]})
  @ApiResponse({status: 403, description: 'faild jwt auth'})
  async getCommentsByCardId(@Param('id') id: string): Promise<GetCommentDto[]> {
    const comments = await this.cardService.getCommentsByCardId(id);
    return comments.map(c => new GetCommentDto(c));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'create card'})
  @ApiResponse({status: 201, description: 'success response', type: GetCardDto})
  @ApiResponse({status: 403, description: 'faild jwt auth or different ids'})
  async create(@Body() createCardDto: CreateCardDto): Promise<GetCardDto> {
    return new GetCardDto(await this.cardService.create(createCardDto));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, CardGuard)
  @ApiOperation({summary: 'update card by id'})
  @ApiResponse({status: 204, description: 'success response'})
  @ApiResponse({status: 403, description: 'faild jwt auth or different ids'})
  async updateById(
    @Param('id') id: string,
    @Body() updateCardDto: UpdateCardDto
    ): Promise<string> {
      await this.cardService.updateById(id, updateCardDto);
      return 'Card is updated'
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, CardGuard)
  @ApiOperation({summary: 'delete card by id'})
  @ApiResponse({status: 204, description: 'success response'})
  @ApiResponse({status: 403, description: 'faild jwt auth or different ids'})
  async deleteById(@Param('id') id: string): Promise<string> {
    await this.cardService.deleteById(id);
    return 'Card is deleted';
  }

}