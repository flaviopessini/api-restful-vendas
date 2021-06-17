import AppError from '@shared/errors/AppError';
import path from 'path';
import { getCustomRepository } from 'typeorm';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';
import { UserTokensRepository } from '../typeorm/repositories/UserTokensRepository';
import EtherealMail from '@config/mail/EtherealMail';

interface IRequest {
  email: string;
}

class SendForgotPasswordEmailService {
  private readonly frontendResetPasswordURL =
    'http://localhost:3000/reset_password?token=';

  public async execute({ email }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UsersRepository);
    const userTokensRepository = getCustomRepository(UserTokensRepository);
    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Usuário não existe');
    }
    const { token } = await userTokensRepository.generate(user.id);
    if (!token) {
      throw new AppError(
        'Houve uma falha ao gerar token para resetar senha',
        500,
      );
    }
    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot_password.hbs',
    );
    await EtherealMail.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de senha',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `${this.frontendResetPasswordURL}${token}`,
        },
      },
    });
  }
}

export default SendForgotPasswordEmailService;
