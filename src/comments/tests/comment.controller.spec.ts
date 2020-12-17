import { Test } from '@nestjs/testing';
import { CommentController } from '../comment.controller';
import { CommentService } from '../comment.service';

describe('UserController', () => {
  let commentController: CommentController;

  const result = [{
    id: 'test',
    text: 'test',
  }];

  const mockCardService = {
    getAll: () => (result),
    getById: () => (result[0]),
    create: (comment) => {result.push({...comment, id: 'createTest'}); return result[1]},
    updateById: (id, updateBody) => {result.map(u => u.id === id ? {...u, ...updateBody} : u)},
    deleteById: (id) => result.filter(u => u.id !== id),
  };

  const commentServiceProvider = {
    provide: CommentService,
    useValue: mockCardService,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [commentServiceProvider],
    }).compile();

    commentController = moduleRef.get<CommentController>(CommentController);
  });

  describe('getAll', () => {
    it('should return comment dto array', async () => {
      expect(await commentController.getAll()).toEqual([{id: 'test', text: 'test'}]);
    });
  });

  describe('getById', () => {
    it('should return comment dto', async () => {
      expect(await commentController.getById('test')).toEqual({id: 'test', text: 'test'});
    });
  });

  describe('create', () => {
    it('should return comment dto', async () => {
      expect(await commentController.create({
        text: 'createTest',
        authorId: 'createTest',
        cardId: 'createTest',
      })).toEqual({id: 'createTest', text: 'createTest'});
    });
  });

  describe('update by id', () => {
    it('should return comment is updated string', async () => {
      expect(await commentController.updateById('test', {
        text: 'updatexTest',
      })).toEqual('Comment is updated');
    });
  });

  describe('delete by id', () => {
    it('should return comment is deleted string', async () => {
      expect(await commentController.deleteById('test')).toEqual('Comment is deleted');
    });
  });
})