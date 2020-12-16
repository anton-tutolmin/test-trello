import { ApiProperty } from "@nestjs/swagger";

export class AuthTokenDto {
  constructor(token: string) {
    this.token = token
  }
  
  @ApiProperty()
  token: string;
}