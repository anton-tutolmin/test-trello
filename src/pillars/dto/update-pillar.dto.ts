import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsString, Length } from "class-validator";

export class UpdatePillarDto {
  @ApiProperty({
    minLength: 4,
  })
  @IsString()
  @IsAlpha()
  @Length(8)
  title: string;
}