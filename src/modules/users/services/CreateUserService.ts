import AppError from '@shared/errors/AppError';
import { hash } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';

interface IRequest {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async execute({ name, email, password }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);
    const userExists = await userRepository.findByEmail(email);
    if (userExists) {
      throw new AppError(
        'Já existe um usuário cadastrado com esse e-mail',
        400,
      );
    }
    const hashPasswd = await hash(password, 8);
    const user = userRepository.create({
      name,
      email,
      password: hashPasswd,
    });
    await userRepository.save(user);
    return user;
  }
}

export default CreateUserService;
