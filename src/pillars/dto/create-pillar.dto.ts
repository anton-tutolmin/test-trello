import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsString, Length } from "class-validator";

export class CreatePillarDto {
  @IsString()
  @IsAlpha()
  @Length(4)
  @ApiProperty({minLength: 4})
  title: string;

  @IsString()
  @ApiProperty()
  authorId: string;

  @IsString()
  @ApiProperty()
  deskId: string;
}
