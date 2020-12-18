import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@ApiTags('comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @ApiOperation({summary: 'create comment'})
  @ApiResponse({status: 201, description: 'comment successfully created'})
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @ApiOperation({summary: 'return comment array'})
  @ApiResponse({status: 200, description: 'success response'})
  async findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @ApiOperation({summary: 'return comment by id'})
  @ApiResponse({status: 200, description: 'success response'})
  async findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({summary: 'update comment by id'})
  @ApiResponse({status: 204, description: 'comment successfully updated'})
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto): Promise<string> {
    await this.commentsService.update(id, updateCommentDto);
    return 'Comment is updated';
  }

  @Delete(':id')
  @ApiOperation({summary: 'delete comment by id'})
  @ApiResponse({status: 201, description: 'comment successfully deleted'})
  async remove(@Param('id') id: string): Promise<string> {
    await this.commentsService.remove(id);
    return 'Comment is deleted';
  }
}
