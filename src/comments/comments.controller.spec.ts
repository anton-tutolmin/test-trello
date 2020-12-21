import { Test } from '@nestjs/testing';
import { CardsService } from '../cards/cards.service';
import { UsersService } from '../users/users.service';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';

describe('UserController', () => {
  let commentController: CommentsController;

  const result = [{
    id: 'test',
    text: 'test',
    card: null,
    author: null,
  }];

  const mockCardService = {
    findAll: () => (result),
    findOne: () => (result[0]),
    create: (comment) => {result.push({...comment, id: 'createTest'}); return result[1]},
    update: (id, updateBody) => {result.map(u => u.id === id ? {...u, ...updateBody} : u)},
    remove: (id) => result.filter(u => u.id !== id),
  };

  const commentServiceProvider = {
    provide: CommentsService,
    useValue: mockCardService,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CommentsController],
      providers: [
        commentServiceProvider,
        {provide: CardsService, useValue: {}},
        {provide: UsersService, useValue: {}},
      ],
    }).compile();

    commentController = moduleRef.get<CommentsController>(CommentsController);
  });

  describe('findAll', () => {
    it('should return comment array', async () => {
      expect(await commentController.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return comment', async () => {
      expect(await commentController.findOne('test')).toEqual(result[0]);
    });
  });

  describe('create', () => {
    it('should return comment', async () => {
      const comment = {
        text: 'createTest',
        authorId: 'createTest',
        cardId: 'createTest',
      };

      expect(await commentController.create(comment)).toEqual({id: 'createTest', ...comment});
    });
  });

  describe('update', () => {
    it('should return comment is updated string', async () => {
      expect(await commentController.update('test', {
        text: 'updatexTest',
      })).toEqual('Comment is updated');
    });
  });

  describe('remove', () => {
    it('should return comment is deleted string', async () => {
      expect(await commentController.remove('test')).toEqual('Comment is deleted');
    });
  });
})