import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { GetCommentDto } from "./dto/get-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentGuard } from "./guards/comment.guard";

@ApiTags('comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentController {
  constructor(private commentService: CommentService) {}

  @Get()
  @ApiOperation({summary: 'return array of comment dtos'})
  @ApiResponse({status: 200, description: 'success response', type: [GetCommentDto]})
  async getAll(): Promise<GetCommentDto[]> {
    const comments = await this.commentService.getAll();
    return comments.map(c => new GetCommentDto(c));
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'return comment dto'})
  @ApiResponse({status: 200, description: 'success response', type: GetCommentDto})
  @ApiResponse({status: 403, description: 'faild jwt auth'})
  async getById(@Param('id') id: string): Promise<GetCommentDto> {
    return new GetCommentDto(await this.commentService.getById(id));
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({summary: 'create comment'})
  @ApiResponse({status: 201, description: 'success response', type: GetCommentDto})
  @ApiResponse({status: 403, description: 'faild jwt auth'})
  async create(@Body() createCommentDto: CreateCommentDto): Promise<GetCommentDto> {
    return new GetCommentDto(await this.commentService.create(createCommentDto));
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard, CommentGuard)
  @ApiOperation({summary: 'update comment by id'})
  @ApiResponse({status: 204, description: 'success response'})
  @ApiResponse({status: 403, description: 'faild jwt auth or different ids'})
  async updateById(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto
    ): Promise<string> {
      await this.commentService.updateById(id, updateCommentDto);
      return 'Comment is updated';
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, CommentGuard)
  @ApiOperation({summary: 'delete comment by id'})
  @ApiResponse({status: 204, description: 'success response'})
  @ApiResponse({status: 403, description: 'faild jwt auth or different ids'})
  async deleteById(@Param('id') id: string): Promise<string> {
    await this.commentService.deleteById(id);
    return 'Comment is deleted';
  }
}