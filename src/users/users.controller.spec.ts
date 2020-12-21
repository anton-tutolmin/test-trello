import { Test } from '@nestjs/testing';
import { UsersController } from "./users.controller"
import { UsersService } from "./users.service";

describe('UserController', () => {
  let userController: UsersController;

  const result = [{
    id: 'test',
    username: 'test',
    password: 'test',
    email: 'test@test.com',
    pillars: [],
    cards: [],
    comments: []
  }];

  const mockUserService = {
    findAll: () => (result),
    findOne: () => (result[0]),
    findDesksByUserId: () => (result[0].pillars),
    create: (user) => {result.push({...user, id: 'createTest'}); return result[1]},
    update: (id, updateBody) => {result.map(u => u.id === id ? {...u, ...updateBody} : u)},
    remove: (id) => result.filter(u => u.id !== id),
  };

  const userServiceProvider = {
    provide: UsersService,
    useValue: mockUserService,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [userServiceProvider],
    }).compile();

    userController = moduleRef.get<UsersController>(UsersController);
  });

  describe('findAll', () => {
    it('should return user array', async () => {
      expect(await userController.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return user', async () => {
      expect(await userController.findOne('test')).toEqual(result[0]);
    });
  });

  describe('findPillarsByUserId', () => {
    it('should return empty array', async () => {
      expect(await userController.findDesksByUserId('test')).toEqual([]);
    });
  });

  describe('create', () => {
    it('should return user', async () => {
      const user = {
        id: 'createTest',
        username: 'createTest',
        email: 'createTest@test.com',
        password: 'createTest',
      };

      expect(await userController.create(user)).toEqual({
        ...user,
        password: 'createTest',
      });
    });
  });

  describe('update', () => {
    it('should return user is updated string', async () => {
      expect(await userController.update('test', {
        username: 'createTest',
        email: 'createTest@test.com'
      })).toEqual('User is updated');
    });
  });

  describe('delete', () => {
    it('should return user is deleted string', async () => {
      expect(await userController.remove('test')).toEqual('User is deleted');
    });
  });
})