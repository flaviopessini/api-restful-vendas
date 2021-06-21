import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import { hash } from 'bcryptjs';
import { UsersRepository } from '../infra/typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../infra/typeorm/repositories/UserTokensRepository';

interface IRequest {
  token: string;
  password: string;
}

class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    const userToken = await userTokensRepository.findByToken(token);
    if (!userToken) {
      throw new AppError('Token não existe');
    }
    const user = await userRepository.findOne(userToken.user_id);
    if (!user) {
      throw new AppError('Usuário não existe');
    }
    const tokenCreatedAt = userToken.created_at;
    const compareDate = addHours(tokenCreatedAt, 2);
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expirado');
    }
    user.password = await hash(password, 8);
    await userRepository.save(user);
  }
}

export default ResetPasswordService;
