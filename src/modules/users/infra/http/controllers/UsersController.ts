import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';
import ListUserService from '@modules/users/services/ListUserService';
import ShowUserService from '@modules/users/services/ShowUserService';
import { container } from 'tsyringe';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    let search = '';
    const sortField = String(request.query.sortField);
    if (request.query.search) {
      search = String(request.query.search);
    }
    const listUsers = container.resolve(ListUserService);
    const users = await listUsers.execute(search, sortField);
    return response.status(200).json(classToClass(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showUser = container.resolve(ShowUserService);
    const user = await showUser.execute({ id });
    return response.status(200).json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = container.resolve(CreateUserService);
    const user = await createUser.execute({ name, email, password });
    return response.status(201).json(classToClass(user));
  }

  // TODO: update(){}

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUser = container.resolve(DeleteUserService);
    await deleteUser.execute({ id });
    return response.status(204).send();
  }
}
