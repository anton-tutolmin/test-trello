import { Injectable } from '@nestjs/common';
import { CreatePillarDto } from './dto/create-pillar.dto';
import { UpdatePillarDto } from './dto/update-pillar.dto';

@Injectable()
export class PillarsService {
  create(createPillarDto: CreatePillarDto) {
    return 'This action adds a new pillar';
  }

  findAll() {
    return `This action returns all pillars`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pillar`;
  }

  update(id: number, updatePillarDto: UpdatePillarDto) {
    return `This action updates a #${id} pillar`;
  }

  remove(id: number) {
    return `This action removes a #${id} pillar`;
  }
}
