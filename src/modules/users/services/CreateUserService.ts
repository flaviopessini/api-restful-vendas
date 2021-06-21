import AppError from '@shared/errors/AppError';
import { injectable, inject } from 'tsyringe';
import { ICreateUser } from '../domain/models/ICreateUser';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';
import { IHashProvider } from '../providers/HashProvider/models/IHashPovider';

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ name, email, password }: ICreateUser): Promise<IUser> {
    const userExists = await this.usersRepository.findByEmail(email);
    if (userExists) {
      throw new AppError(
        'Já existe um usuário cadastrado com esse e-mail',
        400,
      );
    }
    const hashPasswd = await this.hashProvider.generateHash(password);
    const user = this.usersRepository.create({
      name,
      email,
      password: hashPasswd,
    });
    return user;
  }
}

export default CreateUserService;
