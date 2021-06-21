import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import CreateUserService from '../../../services/CreateUserService';
import DeleteUserService from '../../../services/DeleteUserService';
import ListUserService from '../../../services/ListUserService';
import ShowUserService from '../../../services/ShowUserService';

export default class UsersController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listUsers = new ListUserService();
    const users = await listUsers.execute();
    return response.status(200).json(classToClass(users));
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const showUser = new ShowUserService();
    const user = await showUser.execute({ id });
    return response.status(200).json(classToClass(user));
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUser = new CreateUserService();
    const user = await createUser.execute({ name, email, password });
    return response.status(201).json(classToClass(user));
  }

  // TODO: update(){}

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const deleteUser = new DeleteUserService();
    await deleteUser.execute({ id });
    return response.status(204).send();
  }
}
