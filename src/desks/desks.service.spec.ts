import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from '../users/users.service';
import { DesksService } from './desks.service';
import { User } from '../users/entities/user.entity';
import { Desk } from './entities/desk.entity';

describe('UserController', () => {
  let deskService: DesksService;
  let userService: UsersService;
  let mockDeskRepository: MockType<Repository<Desk>>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        DesksService,
        {provide: getRepositoryToken(Desk), useFactory: repositoryMockFactory},
        {provide: UsersService, useValue: {}},
      ],
    }).compile();

    deskService = moduleRef.get<DesksService>(DesksService);
    userService = moduleRef.get<UsersService>(UsersService);
    mockDeskRepository = moduleRef.get(getRepositoryToken(Desk));
  });

  describe('findAll', () => {
    it('should return desk array', async () => {
      const desk = new Desk();
      desk.id = 'testGetAll';
      desk.title = 'testGetAll';

      mockDeskRepository.find.mockReturnValue([desk]);

      expect(await deskService.findAll()).toEqual([desk]);
    });
  });

  describe('findOne', () => {
    it('should return desk', async () => {
      const desk = new Desk();
      desk.id = 'testGetById';
      desk.title = 'testGetById';

      mockDeskRepository.findOne.mockReturnValue(desk);

      expect(await deskService.findOne('testGetById')).toEqual(desk);
    });
  });

  describe('findPillarsByDeskId', () => {
    it('should return pillar array', async () => {
      const desk = new Desk();
      desk.id = 'testGetPillars';
      desk.title = 'testGetPillars';
      desk.pillars = [{
        id: 'test',
        title: 'test',
        desk: desk,
        cards: [],
        author: null,
      }];

      mockDeskRepository.findOne.mockReturnValue(desk);

      expect(await deskService.findPillarsByDeskId('testGetPillrs')).toEqual(desk.pillars);
    });
  });

  describe('findAccessibleByDeskId', () => {
    it('should return users array', async () => {
      const desk = new Desk();
      desk.id = 'test';
      desk.title = 'test';
      desk.accessibleUsers = [
        {
          id: 'test',
          username: 'test',
          password: 'test',
          email: 'test',
          ownedCards: [],
          ownedDesks: [],
          ownedComments: [],
          ownedPillars: [],
          accessibleDesk: [desk],
        }
      ];

      mockDeskRepository.findOne.mockReturnValue(desk);

      expect(await deskService.findAccessibleByDeskId('testGetPillars')).toEqual(desk.accessibleUsers);
    });
  });

  describe('create', () => {
    it('should return created desk', async () => {
      const desk = new Desk();
      desk.id = 'test';
      desk.title = 'test';

      userService.findOne = async () => new User();
      mockDeskRepository.save.mockReturnValue(desk);

      expect(await deskService.create({title: desk.title, authorId: 'test'})).toEqual(desk);
    });
  });

  describe('addUserAccessible', () => {
    it('should return desk', async () => {
      const desk = new Desk();
      desk.id = 'test';
      desk.title = 'test';
      desk.accessibleUsers = [];

      const user = new User();

      userService.findOne = async () => user;
      mockDeskRepository.findOne.mockReturnValue(desk);

      desk.accessibleUsers = [...desk.accessibleUsers, user];

      mockDeskRepository.save.mockReturnValue(desk);

      expect(await deskService.addUserAccessible(desk.id, {userId: 'test'})).toEqual(desk);
    });
  });

  describe('removeUserAccessible', () => {
    it('should return desk', async () => {
      const desk = new Desk();
      desk.id = 'test';
      desk.title = 'test';

      const user = new User();
      user.id = 'test';

      desk.accessibleUsers = [user];

      userService.findOne = async () => user;
      mockDeskRepository.findOne.mockReturnValue(desk);

      desk.accessibleUsers = desk.accessibleUsers.filter(u => u.id === user.id);

      mockDeskRepository.save.mockReturnValue(desk);

      expect(await deskService.addUserAccessible(desk.id, {userId: 'test'})).toEqual(desk);
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