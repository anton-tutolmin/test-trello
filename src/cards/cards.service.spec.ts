import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { Repository } from 'typeorm';
import { CardsService } from './cards.service';
import { Card } from './entities/card.entity';
import { PillarsService } from '../pillars/pillars.service';
import { User } from '../users/entities/user.entity';
import { Pillar } from '../pillars/entities/pillar.entity';

describe('UserController', () => {
  let cardService: CardsService;
  let userService: UsersService;
  let pillarService: PillarsService;
  let mockPillarRepository: MockType<Repository<Card>>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CardsService,
        {provide: getRepositoryToken(Card), useFactory: repositoryMockFactory},
        {provide: UsersService, useValue: {}},
        {provide: PillarsService, useValue: {}},
      ],
    }).compile();

    cardService = moduleRef.get<CardsService>(CardsService);
    userService = moduleRef.get<UsersService>(UsersService);
    pillarService = moduleRef.get<PillarsService>(PillarsService);
    mockPillarRepository = moduleRef.get(getRepositoryToken(Card));
  });

  describe('findAll', () => {
    it('should return card array', async () => {
      const card = new Card();
      card.id = 'testGetAll';
      card.title = 'testGetAll';
      card.description = 'testGetAll';

      mockPillarRepository.find.mockReturnValue([card]);

      expect(await cardService.findAll()).toEqual([card]);
    });
  });

  describe('findOne', () => {
    it('should return card', async () => {
      const card = new Card();
      card.id = 'testGetById';
      card.title = 'testGetById';
      card.description = 'testGetById';

      mockPillarRepository.findOne.mockReturnValue(card);

      expect(await cardService.findOne('testGetById')).toEqual(card);
    });
  });

  describe('findCommentsByCardId', () => {
    it('should return comment array', async () => {
      const card = new Card();
      card.id = 'testGetComments';
      card.title = 'testGetComments';
      card.description = 'testGetComments'
      card.comments = [{
        card: card,
        id: 'testGetCards',
        text: 'testGetCards',
        author: null,
      }];

      mockPillarRepository.findOne.mockReturnValue(card);

      expect(await cardService.findCommentsByCardId('testGetPillars')).toEqual(card.comments);
    });
  });

  describe('findAccessibleByCardId', () => {
    it('should return comment array', async () => {
      const card = new Card();
      card.id = 'testGetComments';
      card.title = 'testGetComments';
      card.description = 'testGetComments'
      card.comments = [];
      card.pillar = {
        id: 'test',
        title: 'test',
        author: null,
        cards: [card],
        desk: {
          id: 'test',
          title: 'test',
          author: null,
          pillars: [],
          accessibleUsers: [new User()],
        }
      }

      mockPillarRepository.findOne.mockReturnValue(card);

      expect(await cardService.findAccessibleByCardId('testGetPillars')).toEqual(card.pillar.desk.accessibleUsers);
    });
  });

  describe('create', () => {
    it('should return created card', async () => {
      const card = new Card();
      card.id = 'testCreate';
      card.title = 'testCreate';
      card.description = 'testCreate';

      userService.findOne = async () => new User();
      pillarService.findOne = async () => new Pillar();
      mockPillarRepository.save.mockReturnValue(card);

      expect(await cardService.create({
        title: card.title,
        description: card.description,
        authorId: 'test',
        pillarId: 'test',
      })).toEqual(card);
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