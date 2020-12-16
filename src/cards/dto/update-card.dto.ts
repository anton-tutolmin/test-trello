import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsAlpha, IsOptional, IsString, Length } from "class-validator";

export class UpdateCardDto {
  @ApiPropertyOptional({
    minLength: 4,
  })
  @IsOptional()
  @IsString()
  @IsAlpha()
  @Length(4)
  title: string;

  @ApiPropertyOptional({
    minLength: 4,
  })
  @IsOptional()
  @IsString()
  @IsAlpha()
  @Length(4)
  description: string;
}