import { ApiProperty } from "@nestjs/swagger";
import { Pillar } from "../entities/pillar.entity";

export class GetPillarDto {
  constructor(pillar: Pillar) {
    this.id = pillar.id;
    this.title = pillar.title;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;
}