import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { CommentsService } from './comments.service';
import { CardsService } from '../cards/cards.service';
import { Comment } from './entities/comment.entity';
import { Card } from '../cards/entities/card.entity';

describe('UserController', () => {
  let commentService: CommentsService;
  let userService: UsersService;
  let cardService: CardsService;
  let mockPillarRepository: MockType<Repository<Comment>>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CommentsService,
        {provide: getRepositoryToken(Comment), useFactory: repositoryMockFactory},
        {provide: UsersService, useValue: {}},
        {provide: CardsService, useValue: {}},
      ],
    }).compile();

    commentService = moduleRef.get<CommentsService>(CommentsService);
    userService = moduleRef.get<UsersService>(UsersService);
    cardService = moduleRef.get<CardsService>(CardsService);
    mockPillarRepository = moduleRef.get(getRepositoryToken(Comment));
  });

  describe('findAll', () => {
    it('should return comment array', async () => {
      const comment = new Comment();
      comment.id = 'testGetAll';
      comment.text = 'testGetAll';

      mockPillarRepository.find.mockReturnValue([comment]);

      expect(await commentService.findAll()).toEqual([comment]);
    });
  });

  describe('findOne', () => {
    it('should return comment', async () => {
      const comment = new Comment();
      comment.id = 'testGetById';
      comment.text = 'testGetById';

      mockPillarRepository.findOne.mockReturnValue(comment);

      expect(await commentService.findOne('testGetById')).toEqual(comment);
    });
  });

  describe('findAccessibleByCommentId', () => {
    it('should return accessible user array', async () => {
      const comment = new Comment();
      comment.id = 'test';
      comment.text = 'test';
      comment.author = null;
      comment.card = {
        id: 'test',
        title: 'test',
        description: 'test',
        author: null,
        comments: [comment],
        pillar: {
          id: 'test',
          title: 'test',
          author: null,
          cards: [comment.card],
          desk: {
            id: 'test',
            title: 'test',
            author: null,
            pillars: [],
            accessibleUsers: [new User()],
          },
        },
      };
      mockPillarRepository.findOne.mockReturnValue(comment);
      expect(await commentService.findAccessibleByCommentId('testGetPillars')).toEqual(comment.card.pillar.desk.accessibleUsers);
    });
  });

  describe('create', () => {
    it('should return created comment', async () => {
      const comment = new Comment();
      comment.id = 'testCreate';
      comment.text = 'testCreate';

      userService.findOne = async () => new User();
      cardService.findOne = async () => new Card();
      mockPillarRepository.save.mockReturnValue(comment);

      expect(await commentService.create({
        text: comment.text,
        authorId: 'test',
        cardId: 'test',
      })).toEqual(comment);
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