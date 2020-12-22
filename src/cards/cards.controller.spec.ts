import { Test } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { PillarsService } from '../pillars/pillars.service';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

describe('UserController', () => {
  let cardController: CardsController;

  const result = [{
    id: 'test',
    title: 'test',
    description: 'test',
    comments: [],
    pillar: null,
  }];

  const mockCardService = {
    findAll: () => (result),
    findOne: () => (result[0]),
    findCommentsByCardId: () => (result[0].comments),
    create: (card) => {result.push({...card, id: 'createTest'}); return result[1]},
    update: (id, updateBody) => {result.map(u => u.id === id ? {...u, ...updateBody} : u)},
    remove: (id) => result.filter(u => u.id !== id),
  };

  const commentServiceProvider = {
    provide: CardsService,
    useValue: mockCardService,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CardsController],
      providers: [
        commentServiceProvider,
        {provide: PillarsService, useValue: {}},
        {provide: UsersService, useValue: {}},
      ],
    }).compile();

    cardController = moduleRef.get<CardsController>(CardsController);
  });

  describe('findAll', () => {
    it('should return card array', async () => {
      expect(await cardController.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return card', async () => {
      expect(await cardController.findOne('test')).toEqual(result[0]);
    });
  });

  describe('findCommentsByCardId', () => {
    it('should return empty array', async () => {
      expect(await cardController.findCommentsByCardId('test')).toEqual([]);
    });
  });

  describe('create', () => {
    it('should return card', async () => {
      const card = {
        title: 'createTest',
        description: 'createTest',
        authorId: 'createTest',
        pillarId: 'createTetst',
      };

      expect(await cardController.create(card)).toEqual({...card, id: 'createTest'});
    });
  });

  describe('update', () => {
    it('should return card is updated string', async () => {
      expect(await cardController.update('test', {
        title: 'updatexTest',
        description: 'updateTest',
      })).toEqual('Card is updated');
    });
  });

  describe('remove', () => {
    it('should return card is deleted string', async () => {
      expect(await cardController.remove('test')).toEqual('Card is deleted');
    });
  });
})