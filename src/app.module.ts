import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { CardModule } from './cards/card.module';
import { PillarModule } from './pillars/pillar.module';
import { HashModule } from './hash/hash.module';
import { UserModule } from './users/users.module';
import { CommentModule } from './comments/comment.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    PillarModule,
    CardModule,
    CommentModule,
    AuthModule,
    HashModule,
  ],
})
export class AppModule {}
