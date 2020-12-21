import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, UsePipes, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentDto, CommentTransformInterceptor } from '../comments/interceptors/comment-transform.interceptor';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { Comment } from '../comments/entities/comment.entity';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { MoveCardDto } from './dto/move-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';
import { CardAccessibleGuard } from './guards/card-accessible.guard';
import { CardGuard } from './guards/card.guard';
import { CreateCardGuard } from './guards/create-card.guard';
import { CardDto, CardTransformInterceptor } from './interceptors/card-transform.interceptor';
import { CreateCardValidationPipe } from './pipes/create-card-validation.pipe';
import { moveCardValidationPipe } from './pipes/move-card-validation.pipe';

@ApiTags('cards')
@ApiBearerAuth()
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  @UseGuards(JwtGuard, CreateCardGuard)
  @UseInterceptors(CardTransformInterceptor)
  @ApiOperation({summary: 'create card'})
  @ApiResponse({status: 201, description: 'card successfully created', type: CardDto})
  async create(@Body('', CreateCardValidationPipe) createCardDto: CreateCardDto): Promise<Card> {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  @UseInterceptors(CardTransformInterceptor)
  @ApiOperation({summary: 'return card array'})
  @ApiResponse({status: 200, description: 'success response', type: [CardDto]})
  async findAll(): Promise<Card[]> {
    return this.cardsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard, CardAccessibleGuard)
  @UseInterceptors(CardTransformInterceptor)
  @ApiOperation({summary: 'return card by id'})
  @ApiResponse({status: 200, description: 'success response', type: CardDto})
  async findOne(@Param('id') id: string): Promise<Card> {
    return this.cardsService.findOne(id);
  }

  @Get(':id/comments')
  @UseGuards(JwtGuard, CardAccessibleGuard)
  @UseInterceptors(CommentTransformInterceptor)
  @ApiOperation({summary: 'return comment array by card id'})
  @ApiResponse({status: 200, description: 'success response', type: [CommentDto]})
  async findCommentsByCardId(@Param('id') id: string): Promise<Comment[]> {
    return this.cardsService.findCommentByCardId(id);
  }

  @Put(':id')
  @UseGuards(JwtGuard, CardGuard)
  @ApiOperation({summary: 'update card by id'})
  @ApiResponse({status: 204, description: 'card successfully updated'})
  async update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto): Promise<string> {
    await this.cardsService.update(id, updateCardDto);
    return 'Card is updated';
  }

  @Put(':id/move')
  @UseGuards(JwtGuard, CardGuard, CreateCardDto)
  @UsePipes(moveCardValidationPipe)
  @ApiOperation({summary: 'move card to another pillar'})
  @ApiResponse({status: 200, description: 'card successfully updated'})
  async moveCard(@Param('id') cardId: string, @Body() moveCardDto: MoveCardDto): Promise<Card> {
    return this.cardsService.moveCard(cardId, moveCardDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard, CardGuard)
  @ApiOperation({summary: 'delete card'})
  @ApiResponse({status: 204, description: 'card successfully deleted'})
  async remove(@Param('id') id: string): Promise<string> {
    await this.cardsService.remove(id);
    return 'Card is deleted';
  }
}
