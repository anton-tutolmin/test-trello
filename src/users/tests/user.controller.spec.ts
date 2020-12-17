import { Test } from '@nestjs/testing';
import { UserController } from "../users.controller"
import { UserService } from "../users.service";

describe('UserController', () => {
  let userController: UserController;

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
    getAll: () => (result),
    getById: () => (result[0]),
    getPillarsByUserId: () => (result[0].pillars),
    create: (user) => {result.push({...user, id: 'createTest'}); return result[1]},
    updateById: (id, updateBody) => {result.map(u => u.id === id ? {...u, ...updateBody} : u)},
    deleteById: (id) => result.filter(u => u.id !== id),
  };

  const userServiceProvider = {
    provide: UserService,
    useValue: mockUserService,
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UserController],
      providers: [userServiceProvider],
    }).compile();

    userController = moduleRef.get<UserController>(UserController);
  });

  describe('getAll', () => {
    it('should return user dto array', async () => {
      expect(await userController.getAll()).toEqual([
        {id: 'test', username: 'test', email: 'test@test.com'}
      ]);
    });
  });

  describe('getById', () => {
    it('should return user dto', async () => {
      expect(await userController.getById('test')).toEqual({
        id: 'test',
        username: 'test',
        email: 'test@test.com'
      });
    });
  });

  describe('getPillarsByUserId', () => {
    it('should return empty array', async () => {
      expect(await userController.getPillarsByUserId('test')).toEqual([]);
    });
  });

  describe('create', () => {
    it('should return user dto', async () => {
      expect(await userController.create({
        username: 'createTest',
        email: 'createTest@test.com',
        password: 'createTest',
      })).toEqual({id: 'createTest', username: 'createTest', email: 'createTest@test.com'});
    });
  });

  describe('update by id', () => {
    it('should return user is updated string', async () => {
      expect(await userController.updateById('test', {
        username: 'createTest',
        email: 'createTest@test.com'
      })).toEqual('User is updated');
    });
  });

  describe('delete by id', () => {
    it('should return user is deleted string', async () => {
      expect(await userController.deleteById('test')).toEqual('User is deleted');
    });
  });
})