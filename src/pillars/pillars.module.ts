import { Module } from '@nestjs/common';
import { PillarsService } from './pillars.service';
import { PillarsController } from './pillars.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pillar } from './entities/pillar.entity';
import { UsersModule } from '../users/users.module';
import { DesksModule } from '../desks/desks.module';

@Module({
  imports: [TypeOrmModule.forFeature([Pillar]), UsersModule, DesksModule],
  controllers: [PillarsController],
  providers: [PillarsService]
})
export class PillarsModule {}
