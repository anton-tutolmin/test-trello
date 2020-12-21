import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsString, IsUUID, Length } from "class-validator";

export class CreatePillarDto {
  @IsString()
  @IsAlpha()
  @Length(4)
  @ApiProperty({minLength: 4})
  title: string;

  @IsUUID()
  @ApiProperty()
  authorId: string;

  @IsUUID()
  @ApiProperty()
  deskId: string;
}
