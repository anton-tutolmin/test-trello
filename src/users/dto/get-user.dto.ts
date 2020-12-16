import { ApiProperty } from "@nestjs/swagger";
import { User } from "../entities/user.entity";

export class GetUserDto {
  constructor(user: User) {
    this.id = user.id;
    this.username = user.username;
    this.email = user.email;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  email: string;
}