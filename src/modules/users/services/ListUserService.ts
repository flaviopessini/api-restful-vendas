import { injectable, inject } from 'tsyringe';
import { IPaginateUser } from '../domain/models/IPaginateUser';
import { IUsersRepository } from '../domain/repositories/IUsersRepository';

@injectable()
class ListUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}
  public async execute(
    search = '',
    sortField = 'name',
  ): Promise<IPaginateUser> {
    return await this.usersRepository.findAllPaginate(search, sortField);
  }
}

export default ListUserService;
