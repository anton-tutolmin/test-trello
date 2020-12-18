import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Comment } from '../comments/entities/comment.entity';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { MoveCardDto } from './dto/move-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@ApiTags('cards')
@ApiBearerAuth()
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @ApiOperation({summary: 'create card'})
  @ApiResponse({status: 201, description: 'card successfully created'})
  async create(@Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  @ApiOperation({summary: 'return card array'})
  @ApiResponse({status: 200, description: 'success response'})
  async findAll(): Promise<Card[]> {
    return this.cardsService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'return card by id'})
  @ApiResponse({status: 200, description: 'success response'})
  async findOne(@Param('id') id: string): Promise<Card> {
    return this.cardsService.findOne(id);
  }

  @Get(':id')
  @ApiOperation({summary: 'return comment array by card id'})
  @ApiResponse({status: 200, description: 'success response'})
  async findCommentsByCardId(@Param('id') id: string): Promise<Comment[]> {
    return this.cardsService.findCommentByCardId(id);
  }

  @Put(':id')
  @ApiOperation({summary: 'update card by id'})
  @ApiResponse({status: 204, description: 'card successfully updated'})
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto): Promise<string> {
    await this.cardsService.update(id, updateCardDto);
    return 'Card is updated';
  }

  @Put(':id/move')
  @ApiOperation({summary: 'move card to another pillar'})
  @ApiResponse({status: 200, description: 'card successfully updated'})
  async moveCard(@Param('id') cardId: string, @Body() moveCardDto: MoveCardDto): Promise<Card> {
    return this.cardsService.moveCard(cardId, moveCardDto);
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete card'})
  @ApiResponse({status: 204, description: 'card successfully deleted'})
  async remove(@Param('id') id: string): Promise<string> {
    await this.cardsService.remove(id);
    return 'Card is deleted';
  }
}
