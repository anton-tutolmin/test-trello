import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { UsersService } from "./users.service";

describe('UserController', () => {
  let userService: UsersService;
  let mockUserRepository: MockType<Repository<User>>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {provide: getRepositoryToken(User), useFactory: repositoryMockFactory}
      ],
    }).compile();

    userService = moduleRef.get<UsersService>(UsersService);
    mockUserRepository = moduleRef.get(getRepositoryToken(User));
  });

  describe('findAll', () => {
    it('should return user array', async () => {
      const user = new User();
      user.id = 'testGetAll';
      user.username = 'testGetAll';
      user.password = 'testGetAll';
      user.email = 'testGetAll@test.com';

      mockUserRepository.find.mockReturnValue([user]);

      expect(await userService.findAll()).toEqual([user]);
    });
  });

  describe('findOne', () => {
    it('should return user', async () => {
      const user = new User();
      user.id = 'testGetById';
      user.username = 'testGetById';
      user.password = 'testGetById';
      user.email = 'testGetById@email.com';

      mockUserRepository.findOne.mockReturnValue(user);

      expect(await userService.findOne('testGetById')).toEqual(user);
    });
  });

  describe('findOneByEmail', () => {
    it('should return user', async () => {
      const user = new User();
      user.id = 'testGetByEmail';
      user.username = 'testGetByEmail';
      user.password = 'testGetByEmail';
      user.email = 'testGetByEmail@test.com';

      mockUserRepository.findOne.mockReturnValue(user);

      expect(await userService.findOneByEmail('testGetByEmail@test.com')).toEqual(user);
    });
  });

  describe('findDesksByUserId', () => {
    it('should return desks array', async () => {
      const user = new User();
      user.id = 'testGetPillars';
      user.username = 'testGetPillars';
      user.password = 'testGetPillars';
      user.email = 'testGetPillars';
      user.ownedDesks = [];

      mockUserRepository.findOne.mockReturnValue(user);

      expect(await userService.findDesksByUserId('testGetPillars')).toEqual(user.ownedDesks);
    });
  });

  describe('findAccessibleDesksByUserId', () => {
    it('should return desk array', async () => {
      const user = new User();
      user.id = 'testGetByEmail';
      user.username = 'testGetByEmail';
      user.password = 'testGetByEmail';
      user.email = 'testGetByEmail@test.com';
      user.accessibleDesk = [
        {
          id: 'testGetAccessible',
          title: 'testGetAccessible',
          author: user,
          accessibleUsers: [user],
          pillars: [],
        }
      ];

      mockUserRepository.findOne.mockReturnValue(user);

      expect(await userService
        .findAccessibleDesksByUserId('testGetByEmail@test.com'))
        .toEqual(user.accessibleDesk);
    });
  });

  describe('create', () => {
    it('should return created user', async () => {
      const user = new User();
      user.id = 'testCreate';
      user.username = 'testCreate';
      user.password = 'testCreate';
      user.email = 'testCreate';

      mockUserRepository.save.mockReturnValue(user);

      expect(await userService.create({
        username: user.username,
        password: user.password,
        email: user.email
      })).toEqual(user);
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