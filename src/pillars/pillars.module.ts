import { Module } from '@nestjs/common';
import { PillarsService } from './pillars.service';
import { PillarsController } from './pillars.controller';

@Module({
  controllers: [PillarsController],
  providers: [PillarsService]
})
export class PillarsModule {}
