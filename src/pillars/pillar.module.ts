import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "src/users/users.module";
import { Pillar } from "./entities/pillar.entity";
import { PillarController } from "./pillar.controller";
import { PillarService } from "./pillar.service";

@Module({
  imports: [TypeOrmModule.forFeature([Pillar]), UserModule],
  providers: [PillarService],
  controllers: [PillarController],
  exports: [PillarService],
})
export class PillarModule {}