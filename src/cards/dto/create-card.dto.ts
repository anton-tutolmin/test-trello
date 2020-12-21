import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsString, IsUUID, Length } from "class-validator";

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

  @IsUUID()
  @ApiProperty()
  authorId: string;

  @IsUUID()
  @ApiProperty()
  pillarId: string;
}
