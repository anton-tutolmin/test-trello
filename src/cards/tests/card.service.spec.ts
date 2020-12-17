import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../../users/users.service';
import { Repository } from 'typeorm';
import { CardService } from '../card.service';
import { Card } from '../entities/card.entity';
import { PillarService } from '../../pillars/pillar.service';
import { User } from '../../users/entities/user.entity';
import { Pillar } from '../../pillars/entities/pillar.entity';

describe('UserController', () => {
  let cardService: CardService;
  let userService: UserService;
  let pillarService: PillarService;
  let mockPillarRepository: MockType<Repository<Card>>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        CardService,
        {provide: getRepositoryToken(Card), useFactory: repositoryMockFactory},
        {provide: UserService, useValue: {}},
        {provide: PillarService, useValue: {}},
      ],
    }).compile();

    cardService = moduleRef.get<CardService>(CardService);
    userService = moduleRef.get<UserService>(UserService);
    pillarService = moduleRef.get<PillarService>(PillarService);
    mockPillarRepository = moduleRef.get(getRepositoryToken(Card));
  });

  describe('getAll', () => {
    it('should return card array', async () => {
      const card = new Card();
      card.id = 'testGetAll';
      card.title = 'testGetAll';
      card.description = 'testGetAll';

      mockPillarRepository.find.mockReturnValue([card]);

      expect(await cardService.getAll()).toEqual([card]);
    });
  });

  describe('getById', () => {
    it('should return card', async () => {
      const card = new Card();
      card.id = 'testGetById';
      card.title = 'testGetById';
      card.description = 'testGetById';

      mockPillarRepository.findOne.mockReturnValue(card);

      expect(await cardService.getById('testGetById')).toEqual(card);
    });
  });

  describe('getCommentsByCardId', () => {
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

      expect(await cardService.getCommentsByCardId('testGetPillars')).toEqual(card.comments);
    });
  });

  describe('create', () => {
    it('should return created card if user and pillar found', async () => {
      const card = new Card();
      card.id = 'testCreate';
      card.title = 'testCreate';
      card.description = 'testCreate';

      userService.getById = async () => new User();
      pillarService.getById = async () => new Pillar();
      mockPillarRepository.save.mockReturnValue(card);

      expect(await cardService.create({
        title: card.title,
        description: card.description,
        authorId: 'test',
        pillarId: 'test',
      })).toEqual(card);
    });

    it('should throw error if user not found', async () => {
      const card = new Card();
      card.id = 'testCreate';
      card.title = 'testCreate';
      card.description = 'testCreate';

      userService.getById = async () => null;
      pillarService.getById = async () => new Pillar();
      mockPillarRepository.save.mockReturnValue(card);

      await expect(cardService.create({
        title: card.title,
        description: card.description,
        authorId: 'test',
        pillarId: 'test',
      }))
        .rejects.toThrow('Http Exception');
    });

    it('should throw error if pillar not found', async () => {
      const card = new Card();
      card.id = 'testCreate';
      card.title = 'testCreate';
      card.description = 'testCreate';

      userService.getById = async () => new User();
      pillarService.getById = async () => null;
      mockPillarRepository.save.mockReturnValue(card);

      await expect(cardService.create({
        title: card.title,
        description: card.description,
        authorId: 'test',
        pillarId: 'test',
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