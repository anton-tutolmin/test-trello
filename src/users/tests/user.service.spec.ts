import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserService } from "../users.service";

describe('UserController', () => {
  let userService: UserService;
  let mockUserRepository: MockType<Repository<User>>;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UserService,
        {provide: getRepositoryToken(User), useFactory: repositoryMockFactory}
      ],
    }).compile();

    userService = moduleRef.get<UserService>(UserService);
    mockUserRepository = moduleRef.get(getRepositoryToken(User));
  });

  describe('getAll', () => {
    it('should return user array', async () => {
      const user = new User();
      user.id = 'testGetAll';
      user.username = 'testGetAll';
      user.password = 'testGetAll';
      user.email = 'testGetAll@test.com';

      mockUserRepository.find.mockReturnValue([user]);

      expect(await userService.getAll()).toEqual([user]);
    });
  });

  describe('getById', () => {
    it('should return user', async () => {
      const user = new User();
      user.id = 'testGetById';
      user.username = 'testGetById';
      user.password = 'testGetById';
      user.email = 'testGetById@email.com';

      mockUserRepository.findOne.mockReturnValue(user);

      expect(await userService.getById('testGetById')).toEqual(user);
    });
  });

  describe('getPillarsByUserId', () => {
    it('should return pillar array', async () => {
      const user = new User();
      user.id = 'testGetPillars';
      user.username = 'testGetPillars';
      user.password = 'testGetPillars';
      user.email = 'testGetPillars';
      user.pillars = [{id: 'testGetPillars', title: 'testGetPillars', author: user, cards: []}];

      mockUserRepository.findOne.mockReturnValue(user);

      expect(await userService.getPillarsByUserId('testGetPillars')).toEqual(user.pillars);
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