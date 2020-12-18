import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsString, Length } from "class-validator";

export class CreateCardDto {
  @IsString()
  @IsAlpha()
  @Length(4)
  @ApiProperty({minLength: 4})
  title: string;

  @IsString()
  @IsAlpha()
  @Length(4)
  @ApiProperty({minLength: 4})
  description: string;

  @IsString()
  @ApiProperty()
  authorId: string;

  @IsString()
  @ApiProperty()
  pillarId: string;
}
