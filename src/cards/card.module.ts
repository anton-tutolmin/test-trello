import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PillarModule } from "../pillars/pillar.module";
import { UserModule } from "../users/users.module";
import { CardController } from "./card.controller";
import { CardService } from "./card.service";
import { Card } from "./entities/card.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Card]), UserModule, PillarModule],
  providers: [CardService],
  controllers: [CardController],
  exports: [CardService]
})
export class CardModule {}