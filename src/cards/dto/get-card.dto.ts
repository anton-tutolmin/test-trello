import { ApiProperty } from "@nestjs/swagger";
import { Card } from "../entities/card.entity";

export class GetCardDto {
  constructor (card: Card) {
    this.id = card.id;
    this.title = card.title;
    this.description = card.description;
  }

  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}