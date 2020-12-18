import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsString } from "class-validator";

export class CreateDeskDto {
  @ApiProperty({minLength: 4})
  @IsString()
  @IsAlpha()
  title: string;

  @ApiProperty()
  @IsString()
  authorId: string;
}
