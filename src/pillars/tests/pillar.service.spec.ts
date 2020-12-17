import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../../users/users.service';
import { Repository } from 'typeorm';
import { Pillar } from '../entities/pillar.entity';
import { PillarService } from '../pillar.service';
import { User } from '../../users/entities/user.entity';

describe('UserController', () => {
  let pillarService: PillarService;
  let userService: UserService;
  let mockPillarRepository: MockType<Repository<Pillar>>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PillarService,
        {provide: getRepositoryToken(Pillar), useFactory: repositoryMockFactory},
        {provide: UserService, useValue: {}}
      ],
    }).compile();

    pillarService = moduleRef.get<PillarService>(PillarService);
    userService = moduleRef.get<UserService>(UserService);
    mockPillarRepository = moduleRef.get(getRepositoryToken(Pillar));
  });

  describe('getAll', () => {
    it('should return pillar array', async () => {
      const pillar = new Pillar();
      pillar.id = 'testGetAll';
      pillar.title = 'testGetAll';

      mockPillarRepository.find.mockReturnValue([pillar]);

      expect(await pillarService.getAll()).toEqual([pillar]);
    });
  });

  describe('getById', () => {
    it('should return pillar', async () => {
      const pillar = new Pillar();
      pillar.id = 'testGetById';
      pillar.title = 'testGetById';

      mockPillarRepository.findOne.mockReturnValue(pillar);

      expect(await pillarService.getById('testGetById')).toEqual(pillar);
    });
  });

  describe('getPillarsByUserId', () => {
    it('should return card array', async () => {
      const pillar = new Pillar();
      pillar.id = 'testGetCards';
      pillar.title = 'testGetCards';
      pillar.cards = [{
        pillar: pillar,
        id: 'testGetCards',
        title: 'testGetCards',
        description: 'testGetCards',
        comments: [],
        author: {
          id: 'testGetCards',
          username: 'testGetCards',
          password: 'testGetCards',
          email: 'testGetCards@test.com',
          pillars: [],
          cards: [],
          comments: [],
        },
      }];

      mockPillarRepository.findOne.mockReturnValue(pillar);

      expect(await pillarService.getCardsByPillarId('testGetPillars')).toEqual(pillar.cards);
    });
  });

  describe('create', () => {
    it('should return created pillar', async () => {
      const pillar = new Pillar();
      pillar.id = 'testCreate';
      pillar.title = 'testCreate';

      userService.getById = async () => new User();
      mockPillarRepository.save.mockReturnValue(pillar);

      expect(await pillarService.create({title: pillar.title, authorId: 'test'})).toEqual(pillar);
    });

    it('should throw error', async () => {
      const pillar = new Pillar();
      pillar.id = 'testCreate';
      pillar.title = 'testCreate';

      userService.getById = async () => null;
      mockPillarRepository.save.mockReturnValue(pillar);

      await expect(pillarService.create({title: 'pillar', authorId: 'test'}))
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