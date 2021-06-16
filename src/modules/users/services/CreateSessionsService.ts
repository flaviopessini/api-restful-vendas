import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

class CreateSessionsService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UsersRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('E-mail ou senha incorretos', 401);
    }
    const passwordConfirmed = await compare(password, user.password);
    if (!passwordConfirmed) {
      throw new AppError('E-mail ou senha incorretos', 401);
    }
    const token = sign(
      {
        id: user.id,
        name: user.name,
      },
      'e10adc3949ba59abbe56e057f20f883e',
      {
        subject: user.id,
        expiresIn: '1d',
      },
    );

    return { user, token };
  }
}

export default CreateSessionsService;
