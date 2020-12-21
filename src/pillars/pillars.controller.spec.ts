import { Test } from '@nestjs/testing';
import { DesksService } from '../desks/desks.service';
import { PillarsController } from './pillars.controller';
import { PillarsService } from './pillars.service';

describe('PillarsController', () => {
  let pillarController: PillarsController;

  const result = [{
    id: 'test',
    title: 'test',
    desk: null,
    cards: [],
  }];

  const mockPillarService = {
    findAll: () => (result),
    findOne: () => (result[0]),
    findCardsByPillarId: () => (result[0].cards),
    create: (pillar) => {result.push({...pillar, id: 'createTest'}); return result[1]},
    update: (id, updateBody) => {result.map(u => u.id === id ? {...u, ...updateBody} : u)},
    remove: (id) => result.filter(u => u.id !== id),
  };

  const pillarServiceProvider = {
    provide: PillarsService,
    useValue: mockPillarService,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PillarsController],
      providers: [pillarServiceProvider, {provide: DesksService, useValue: {}}],
    }).compile();

    pillarController = moduleRef.get<PillarsController>(PillarsController);
  });

  describe('findAll', () => {
    it('should return pillar array', async () => {
      expect(await pillarController.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return pillar dto', async () => {
      expect(await pillarController.findOne('test')).toEqual(result[0]);
    });
  });

  describe('findCardsByPillarId', () => {
    it('should return empty array', async () => {
      expect(await pillarController.findCardsByPillarId('test')).toEqual([]);
    });
  });

  describe('create', () => {
    it('should return pillar dto', async () => {
      const pillar = {
        title: 'createTest',
        authorId: 'createTest',
        deskId: 'createTest',
      };

      expect(await pillarController.create(pillar)).toEqual({...pillar, id: 'createTest'});
    });
  });

  describe('update', () => {
    it('should return pillar is updated string', async () => {
      expect(await pillarController.update('test', {
        title: 'updatexTest',
      })).toEqual('Pillar is updated');
    });
  });

  describe('remove', () => {
    it('should return pillar is deleted string', async () => {
      expect(await pillarController.remove('test')).toEqual('Pillar is deleted');
    });
  });
})