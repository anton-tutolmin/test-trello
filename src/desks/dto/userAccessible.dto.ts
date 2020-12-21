import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class UserAccessibleDto {
  @IsUUID()
  @ApiProperty()
  userId: string;
}