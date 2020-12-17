import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../../users/users.service';
import { Repository } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { CommentService } from '../comment.service';
import { CardService } from '../../cards/card.service';
import { Comment } from '../entities/comment.entity';
import { Card } from '../../cards/entities/card.entity';

describe('UserController', () => {
  let commentService: CommentService;
  let userService: UserService;
  let cardService: CardService;
  let mockPillarRepository: MockType<Repository<Comment>>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CommentService,
        {provide: getRepositoryToken(Comment), useFactory: repositoryMockFactory},
        {provide: UserService, useValue: {}},
        {provide: CardService, useValue: {}},
      ],
    }).compile();

    commentService = moduleRef.get<CommentService>(CommentService);
    userService = moduleRef.get<UserService>(UserService);
    cardService = moduleRef.get<CardService>(CardService);
    mockPillarRepository = moduleRef.get(getRepositoryToken(Comment));
  });

  describe('getAll', () => {
    it('should return comment array', async () => {
      const comment = new Comment();
      comment.id = 'testGetAll';
      comment.text = 'testGetAll';

      mockPillarRepository.find.mockReturnValue([comment]);

      expect(await commentService.getAll()).toEqual([comment]);
    });
  });

  describe('getById', () => {
    it('should return comment', async () => {
      const comment = new Comment();
      comment.id = 'testGetById';
      comment.text = 'testGetById';

      mockPillarRepository.findOne.mockReturnValue(comment);

      expect(await commentService.getById('testGetById')).toEqual(comment);
    });
  });

  describe('create', () => {
    it('should return created comment if user and card found', async () => {
      const comment = new Comment();
      comment.id = 'testCreate';
      comment.text = 'testCreate';

      userService.getById = async () => new User();
      cardService.getById = async () => new Card();
      mockPillarRepository.save.mockReturnValue(comment);

      expect(await commentService.create({
        text: comment.text,
        authorId: 'test',
        cardId: 'test',
      })).toEqual(comment);
    });

    it('should throw error if user not found', async () => {
      const comment = new Comment();
      comment.id = 'testCreate';
      comment.text = 'testCreate';

      userService.getById = async () => null;
      cardService.getById = async () => new Card();
      mockPillarRepository.save.mockReturnValue(comment);

      await expect(commentService.create({
        text: comment.text,
        authorId: 'test',
        cardId: 'test',
      }))
        .rejects.toThrow('Http Exception');
    });

    it('should throw error if card not found', async () => {
      const comment = new Comment();
      comment.id = 'testCreate';
      comment.text = 'testCreate';

      userService.getById = async () => new User();
      cardService.getById = async () => null;
      mockPillarRepository.save.mockReturnValue(comment);

      await expect(commentService.create({
        text: comment.text,
        authorId: 'test',
        cardId: 'test',
      }))
        .rejects.toThrow('Http Exception');
    });
  });
});

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(),
  find: jest.fn(),
  update: jest.fn(),
  save: jest.fn()
 }));

 export type MockType<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [P in keyof T]: jest.Mock<{}>;
 };