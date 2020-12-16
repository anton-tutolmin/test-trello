import { ApiProperty } from "@nestjs/swagger";
import { Comment } from "../entities/comment.entity";

export class GetCommentDto {
  constructor(comment: Comment) {
    this.id = comment.id;
    this.text = comment.text;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  text: string;
}