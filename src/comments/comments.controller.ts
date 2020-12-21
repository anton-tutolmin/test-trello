import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import { CommentAccessibleGuard } from './guards/comment-accessible.guard';
import { CommentGuard } from './guards/comment.guard';
import { CreateCommentGuard } from './guards/create-comment.guard';
import { CommentDto, CommentTransformInterceptor } from './interceptors/comment-transform.interceptor';
import { CreateCommentValidationPipe } from './pipes/create-comment-validation.pipe';

@ApiTags('comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  @UseGuards(JwtGuard, CreateCommentGuard)
  @UseInterceptors(CommentTransformInterceptor)
  @ApiOperation({summary: 'create comment'})
  @ApiResponse({status: 201, description: 'comment successfully created', type: CommentDto})
  async create(@Body('', CreateCommentValidationPipe) createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentsService.create(createCommentDto);
  }

  @Get()
  @UseInterceptors(CommentTransformInterceptor)
  @ApiOperation({summary: 'return comment array'})
  @ApiResponse({status: 200, description: 'success response', type: [CommentDto]})
  async findAll(): Promise<Comment[]> {
    return this.commentsService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard, CommentAccessibleGuard)
  @UseInterceptors(CommentTransformInterceptor)
  @UseGuards(CommentAccessibleGuard)
  @ApiOperation({summary: 'return comment by id'})
  @ApiResponse({status: 200, description: 'success response', type: CommentDto})
  async findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentsService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtGuard, CommentGuard)
  @ApiOperation({summary: 'update comment by id'})
  @ApiResponse({status: 204, description: 'comment successfully updated'})
  async update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto): Promise<string> {
    await this.commentsService.update(id, updateCommentDto);
    return 'Comment is updated';
  }

  @Delete(':id')
  @UseGuards(JwtGuard, CommentGuard)
  @ApiOperation({summary: 'delete comment by id'})
  @ApiResponse({status: 201, description: 'comment successfully deleted'})
  async remove(@Param('id') id: string): Promise<string> {
    await this.commentsService.remove(id);
    return 'Comment is deleted';
  }
}
