import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Usuário não existe');
    }
    const token = await userTokensRepository.generate(user.id);
    if (!token) {
      throw new AppError(
        'Houve uma falha ao gerar token para resetar senha',
        500,
      );
    }
    console.log('TOKEN => ', token);
  }
}

export default SendForgotPasswordEmailService;
