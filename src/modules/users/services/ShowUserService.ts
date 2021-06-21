import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { IShowUser } from '../domain/models/IShowUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

@injectable()
class ShowUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute({ id }: IShowUser): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError('Usuário não encontrado', 400);
    }
    return user;
  }
}

export default ShowUserService;
