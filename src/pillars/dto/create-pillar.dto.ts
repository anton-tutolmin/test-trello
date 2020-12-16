import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsString, Length } from "class-validator";

export class CreatePillarDto {
  @ApiProperty({
    minLength: 4,
  })
  @IsAlpha()
  @Length(4)
  title: string;

  @ApiProperty({
    minLength: 4,
  })
  @IsString()
  authorId: string;
}