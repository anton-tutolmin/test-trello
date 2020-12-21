import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsString, IsUUID } from "class-validator";

export class CreateDeskDto {
  @IsString()
  @IsAlpha()
  @ApiProperty({minLength: 4})
  title: string;

  @IsUUID()
  @ApiProperty()
  authorId: string;
}
