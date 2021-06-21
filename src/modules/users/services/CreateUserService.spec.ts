import 'reflect-metadata';
import { v4 as uuidv4 } from 'uuid';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let createUser: CreateUserService;
let hashProvider: FakeHashProvider;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, hashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: `User ${uuidv4()}`,
      email: `${uuidv4()}@example.com`,
      password: '123456',
    });
    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a user with exists e-mail', async () => {
    await createUser.execute({
      name: 'Cliente #1',
      email: 'same_email@example.com',
      password: '123456',
    });
    const user = async () =>
      await createUser.execute({
        name: 'Cliente #2',
        email: 'same_email@example.com',
        password: '123456',
      });
    expect(user).rejects.toBeInstanceOf(AppError);
  });
});
