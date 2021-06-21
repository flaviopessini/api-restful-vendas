import AppError from '@shared/errors/AppError';
import 'reflect-metadata';
import FakeUsersRepository from '../domain/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateSessionsService from './CreateSessionsService';

let fakeUsersRepository: FakeUsersRepository;
let createSession: CreateSessionsService;
let hashProvider: FakeHashProvider;

describe('CreateSession', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    hashProvider = new FakeHashProvider();
    createSession = new CreateSessionsService(
      fakeUsersRepository,
      hashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User Auth',
      email: 'auth@example.com',
      password: '123456',
    });
    const response = await createSession.execute({
      email: user.email,
      password: user.password,
    });
    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existent user', async () => {
    const user = async () =>
      await createSession.execute({
        email: '999auth@example.com',
        password: '123456',
      });
    expect(user).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate with wrong password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'User Auth',
      email: 'auth_passwd@example.com',
      password: '123456',
    });
    const response = async () =>
      await createSession.execute({
        email: user.email,
        password: 'senhaerrada',
      });
    expect(response).rejects.toBeInstanceOf(AppError);
  });
});
