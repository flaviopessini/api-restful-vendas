import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { hash, compare } from 'bcryptjs';
import User from '../typeorm/entities/User';
import { UsersRepository } from '../typeorm/repositories/UsersRepository';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

class UpdateProfileService {
  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);
    const user = await usersRepository.findOne({ id: user_id });
    if (!user) {
      throw new AppError('Usuário não encontrado');
    }
    const userUpdateEmail = await usersRepository.findByEmail(email);
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
    await usersRepository.save(user);
    return user;
  }
}

export default UpdateProfileService;