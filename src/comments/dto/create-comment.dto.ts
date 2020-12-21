import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsUUID } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @ApiProperty()
  text: string;

  @IsUUID()
  @ApiProperty()
  authorId: string;

  @IsUUID()
  @ApiProperty()
  cardId: string;
}
