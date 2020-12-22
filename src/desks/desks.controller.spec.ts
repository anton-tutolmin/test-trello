import { Test } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { DesksController } from './desks.controller';
import { DesksService } from './desks.service';

describe('PillarsController', () => {
  let deskController: DesksController;

  const result = [{
    id: 'test',
    title: 'test',
    desk: null,
    cards: [],
  }];

  const mockDeskService = {
    findAll: () => (result),
    findOne: () => (result[0]),
    findPillarsByDeskId: () => (result[0].cards),
    create: (desk) => {result.push({...desk, id: 'createTest'}); return result[1]},
    update: (id, updateBody) => {result.map(u => u.id === id ? {...u, ...updateBody} : u)},
    remove: (id) => result.filter(u => u.id !== id),
  };

  const deskServiceProvider = {
    provide: DesksService,
    useValue: mockDeskService,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [DesksController],
      providers: [deskServiceProvider, {provide: UsersService, useValue: {}}],
    }).compile();

    deskController = moduleRef.get<DesksController>(DesksController);
  });

  describe('findAll', () => {
    it('should return desk array', async () => {
      expect(await deskController.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return desk', async () => {
      expect(await deskController.findOne('test')).toEqual(result[0]);
    });
  });

  describe('findPillarsByDeskId', () => {
    it('should return pillars array', async () => {
      expect(await deskController.findPillarsByDeskId('test')).toEqual([]);
    });
  });

  describe('create', () => {
    it('should return crated desk', async () => {
      const desk = {
        title: 'createTest',
        authorId: 'createTest',
      };

      expect(await deskController.create(desk)).toEqual({...desk, id: 'createTest'});
    });
  });

  describe('update', () => {
    it('should return desk is updated string', async () => {
      expect(await deskController.update('test', {
        title: 'updatexTest',
      })).toEqual('Desk is updated');
    });
  });

  describe('remove', () => {
    it('should return desk is deleted string', async () => {
      expect(await deskController.remove('test')).toEqual('Desk is deleted');
    });
  });
})