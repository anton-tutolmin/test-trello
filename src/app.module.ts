import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { PillarsModule } from './pillars/pillars.module';
import { CardsModule } from './cards/cards.module';
import { CommentsModule } from './comments/comments.module';
import { DesksModule } from './desks/desks.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UsersModule,
    PillarsModule,
    CardsModule,
    CommentsModule,
    DesksModule,
  ],
})
export class AppModule {}
