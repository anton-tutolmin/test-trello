import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsString, Length } from "class-validator";

export class CreateCardDto {
  @ApiProperty()
  @IsString()
  pillarId: string;
  
  @ApiProperty()
  @IsString()
  authorId: string;

  @ApiProperty({
    minLength: 4,
  })
  @IsString()
  @IsAlpha()
  @Length(4)
  title: string;

  @ApiProperty({
    minLength: 4,
  })
  @IsString()
  @IsAlpha()
  @Length(4)
  description: string;
}