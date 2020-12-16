import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsEmail, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({
    minLength: 8,
  })
  @IsAlpha()
  @Length(8)
  username: string;

  @ApiProperty()
  @IsEmail({})
  email: string;

  @ApiProperty({
    minLength: 8,
  })
  @IsAlpha()
  @Length(8)
  password: string;
}