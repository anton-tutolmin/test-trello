import { Test, TestingModule } from '@nestjs/testing';
import { PillarsController } from './pillars.controller';
import { PillarsService } from './pillars.service';

describe('PillarsController', () => {
  let controller: PillarsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PillarsController],
      providers: [PillarsService],
    }).compile();

    controller = module.get<PillarsController>(PillarsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
