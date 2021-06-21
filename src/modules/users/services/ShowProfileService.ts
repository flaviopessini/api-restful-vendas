import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { IShowUser } from '../domain/models/IShowUser';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class ShowProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ id }: IShowUser): Promise<IUser> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    return user;
  }
}

export default ShowProfileService;
