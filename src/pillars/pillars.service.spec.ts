import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PillarsService } from './pillars.service';
import { UsersService } from '../users/users.service';
import { DesksService } from '../desks/desks.service';
import { Pillar } from './entities/pillar.entity';
import { User } from '../users/entities/user.entity';
import { Desk } from '../desks/entities/desk.entity';

describe('UserController', () => {
  let pillarService: PillarsService;
  let userService: UsersService;
  let deskService: DesksService;
  let mockPillarRepository: MockType<Repository<Pillar>>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        PillarsService,
        {provide: getRepositoryToken(Pillar), useFactory: repositoryMockFactory},
        {provide: UsersService, useValue: {}},
        {provide: DesksService, useValue: {}}
      ],
    }).compile();

    pillarService = moduleRef.get<PillarsService>(PillarsService);
    userService = moduleRef.get<UsersService>(UsersService);
    deskService = moduleRef.get<DesksService>(DesksService);
    mockPillarRepository = moduleRef.get(getRepositoryToken(Pillar));
  });

  describe('findAll', () => {
    it('should return pillar array', async () => {
      const pillar = new Pillar();
      pillar.id = 'testGetAll';
      pillar.title = 'testGetAll';

      mockPillarRepository.find.mockReturnValue([pillar]);

      expect(await pillarService.findAll()).toEqual([pillar]);
    });
  });

  describe('findOne', () => {
    it('should return pillar', async () => {
      const pillar = new Pillar();
      pillar.id = 'testGetById';
      pillar.title = 'testGetById';

      mockPillarRepository.findOne.mockReturnValue(pillar);

      expect(await pillarService.findOne('testGetById')).toEqual(pillar);
    });
  });

  describe('findCardsByPillarsId', () => {
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
        author: null,
      }];

      mockPillarRepository.findOne.mockReturnValue(pillar);

      expect(await pillarService.findCardsByPillarId('testGetPillars')).toEqual(pillar.cards);
    });
  });

  describe('findAccessiblesByPillarId', () => {
    it('should return users array', async () => {
      const pillar = new Pillar();
      pillar.id = 'testGetCards';
      pillar.title = 'testGetCards';
      pillar.desk = {
        id: 'testGetCards',
        title: 'testGetCards',
        author: null,
        pillars: [pillar],
        accessibleUsers: [
          {
            id: 'test',
            username: 'test',
            email: 'test',
            password: 'test',
            ownedCards: [],
            accessibleDesk: [pillar.desk],
            ownedPillars: [],
            ownedComments: [],
            ownedDesks: [],
          }
        ],
      };

      mockPillarRepository.findOne.mockReturnValue(pillar);

      expect(await pillarService.findAccessibleByPillarId('testGetPillars')).toEqual(pillar.desk.accessibleUsers);
    });
  });

  describe('create', () => {
    it('should return created pillar', async () => {
      const pillar = new Pillar();
      pillar.id = 'testCreate';
      pillar.title = 'testCreate';

      userService.findOne = async () => new User();
      deskService.findOne = async () => new Desk();
      mockPillarRepository.save.mockReturnValue(pillar);

      expect(await pillarService.create({title: pillar.title, authorId: 'test', deskId: 'test'})).toEqual(pillar);
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