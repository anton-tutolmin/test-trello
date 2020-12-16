import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
  @ApiProperty()
  @IsString()
  authorId: string;
  
  @ApiProperty()
  @IsString()
  cardId: string;

  @ApiProperty()
  @IsString()
  @IsAlpha()
  @IsNotEmpty()
  text: string;
}