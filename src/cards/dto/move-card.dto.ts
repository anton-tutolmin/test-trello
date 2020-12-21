import { ApiProperty } from "@nestjs/swagger";
import { IsUUID } from "class-validator";

export class MoveCardDto {
  @IsUUID()
  @ApiProperty()
  pillarId: string;
}