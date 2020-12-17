import { Test } from '@nestjs/testing';
import { PillarController } from '../pillar.controller';
import { PillarService } from '../pillar.service';

describe('UserController', () => {
  let pillarController: PillarController;

  const result = [{
    id: 'test',
    title: 'test',
    cards: [],
  }];

  const mockPillarService = {
    getAll: () => (result),
    getById: () => (result[0]),
    getCardsByPillarId: () => (result[0].cards),
    create: (pillar) => {result.push({...pillar, id: 'createTest'}); return result[1]},
    updateById: (id, updateBody) => {result.map(u => u.id === id ? {...u, ...updateBody} : u)},
    deleteById: (id) => result.filter(u => u.id !== id),
  };

  const pillarServiceProvider = {
    provide: PillarService,
    useValue: mockPillarService,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PillarController],
      providers: [pillarServiceProvider],
    }).compile();

    pillarController = moduleRef.get<PillarController>(PillarController);
  });

  describe('getAll', () => {
    it('should return pillar dto array', async () => {
      expect(await pillarController.getAll()).toEqual([{id: 'test', title: 'test'}]);
    });
  });

  describe('getById', () => {
    it('should return pillar dto', async () => {
      expect(await pillarController.getById('test')).toEqual({id: 'test',title: 'test',});
    });
  });

  describe('getPillarsByUserId', () => {
    it('should return empty array', async () => {
      expect(await pillarController.getCardsByPillarId('test')).toEqual([]);
    });
  });

  describe('create', () => {
    it('should return pillar dto', async () => {
      expect(await pillarController.create({
        title: 'createTest',
        authorId: 'createTest'
      })).toEqual({id: 'createTest', title: 'createTest'});
    });
  });

  describe('update by id', () => {
    it('should return pillar is updated string', async () => {
      expect(await pillarController.updateById('test', {
        title: 'updatexTest',
      })).toEqual('Pillar is updated');
    });
  });

  describe('delete by id', () => {
    it('should return pillar is deleted string', async () => {
      expect(await pillarController.deleteById('test')).toEqual('Pillar is deleted');
    });
  });
})