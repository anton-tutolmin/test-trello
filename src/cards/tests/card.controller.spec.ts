import { Test } from '@nestjs/testing';
import { CardController } from '../card.controller';
import { CardService } from '../card.service';

describe('UserController', () => {
  let cardController: CardController;

  const result = [{
    id: 'test',
    title: 'test',
    description: 'test',
    comments: [],
  }];

  const mockCardService = {
    getAll: () => (result),
    getById: () => (result[0]),
    getCommentsByCardId: () => (result[0].comments),
    create: (card) => {result.push({...card, id: 'createTest'}); return result[1]},
    updateById: (id, updateBody) => {result.map(u => u.id === id ? {...u, ...updateBody} : u)},
    deleteById: (id) => result.filter(u => u.id !== id),
  };

  const pillarServiceProvider = {
    provide: CardService,
    useValue: mockCardService,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CardController],
      providers: [pillarServiceProvider],
    }).compile();

    cardController = moduleRef.get<CardController>(CardController);
  });

  describe('getAll', () => {
    it('should return card dto array', async () => {
      expect(await cardController.getAll()).toEqual([{id: 'test', title: 'test', description: 'test'}]);
    });
  });

  describe('getById', () => {
    it('should return card dto', async () => {
      expect(await cardController.getById('test')).toEqual({id: 'test', title: 'test', description: 'test'});
    });
  });

  describe('getCommentsByCardId', () => {
    it('should return empty array', async () => {
      expect(await cardController.getCommentsByCardId('test')).toEqual([]);
    });
  });

  describe('create', () => {
    it('should return card dto', async () => {
      expect(await cardController.create({
        title: 'createTest',
        description: 'createTest',
        authorId: 'createTest',
        pillarId: 'createTetst',
      })).toEqual({id: 'createTest', title: 'createTest', description: 'createTest'});
    });
  });

  describe('update by id', () => {
    it('should return card is updated string', async () => {
      expect(await cardController.updateById('test', {
        title: 'updatexTest',
        description: 'updateTest',
      })).toEqual('Card is updated');
    });
  });

  describe('delete by id', () => {
    it('should return card is deleted string', async () => {
      expect(await cardController.deleteById('test')).toEqual('Card is deleted');
    });
  });
})