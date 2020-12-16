import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CardModule } from "src/cards/card.module";
import { UserModule } from "src/users/users.module";
import { CommentController } from "./comment.controller";
import { CommentService } from "./comment.service";
import { Comment } from "./entities/comment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Comment]), UserModule, CardModule],
  providers: [CommentService],
  controllers: [CommentController],
})
export class CommentModule {}