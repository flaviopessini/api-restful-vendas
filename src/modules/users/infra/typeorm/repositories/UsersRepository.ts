import { Repository, EntityRepository } from 'typeorm';
import User from '../entities/User';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  public async findByName(name: string): Promise<User | undefined> {
    return await this.findOne({
      where: {
        name: name,
      },
    });
  }

  public async findByEmail(email: string): Promise<User | undefined> {
    return await this.findOne({
      where: {
        email: email,
      },
    });
  }
}
