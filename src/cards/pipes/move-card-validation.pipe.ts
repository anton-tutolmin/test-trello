import { ArgumentMetadata, HttpException, HttpStatus, Injectable, PipeTransform } from "@nestjs/common";
import { PillarsService } from "../../pillars/pillars.service";
import { CardsService } from "../cards.service";

@Injectable()
export class moveCardValidationPipe implements PipeTransform {
  constructor(private cardService: CardsService, private pillarService: PillarsService) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type === 'param' && !(await this.cardService.findOne(value))) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Card with such id is not exist',
      }, HttpStatus.NOT_FOUND);
    } else if (metadata.type === 'body' && !(this.pillarService.findOne(value.pillarId))) {
      throw new HttpException({
        status: HttpStatus.NOT_FOUND,
        error: 'Pillar with such id is not exist',
      }, HttpStatus.NOT_FOUND);
    }
    
    return value;
  }
}