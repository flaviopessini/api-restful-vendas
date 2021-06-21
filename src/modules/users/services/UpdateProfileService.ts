import AppError from '@shared/errors/AppError';
import { hash, compare } from 'bcryptjs';
import { injectable, inject } from 'tsyringe';
import { IUpdateProfile } from '../domain/models/IUpdateProfile';
import { IUser } from '../domain/models/IUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfile): Promise<IUser> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    const userUpdateEmail = await this.usersRepository.findByEmail(email);
    if (userUpdateEmail && userUpdateEmail.id != user_id) {
      throw new AppError('E-mail já está sendo utilizado');
    }
    if (password && !old_password) {
      throw new AppError('Senha antiga é necessária');
    }
    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);
      if (!checkOldPassword) {
        throw new AppError('Senha antiga inválida');
      }
      user.password = await hash(password, 8);
    }
    user.name = name;
    user.email = email;
    await this.usersRepository.save(user);
    return user;
  }
}

export default UpdateProfileService;
