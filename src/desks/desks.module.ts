import { Module } from '@nestjs/common';
import { DesksService } from './desks.service';
import { DesksController } from './desks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desk } from './entities/desk.entity';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Desk]), UsersModule],
  controllers: [DesksController],
  providers: [DesksService],
  exports: [DesksService],
})
export class DesksModule {}
