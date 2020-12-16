import { ApiPropertyOptional } from "@nestjs/swagger";
import { IsAlpha, IsEmail, IsOptional, Length } from "class-validator";

export class UpdateUserDto {
  @ApiPropertyOptional({
    minLength: 8,
  })
  @IsOptional()
  @IsAlpha()
  @Length(8)
  username: string;

  @ApiPropertyOptional({
    minLength: 8,
  })
  @IsOptional()
  @IsEmail({})
  email?: string;
}