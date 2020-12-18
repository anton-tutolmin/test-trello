import { ApiProperty } from "@nestjs/swagger";
import { IsAlpha, IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsAlpha()
  @Length(8)
  @ApiProperty({minLength: 8})
  username: string;

  @IsEmail()
  @ApiProperty()
  email: string;

  @IsString()
  @IsAlpha()
  @Length(8)
  @ApiProperty({minLength: 8})
  password: string;
}
