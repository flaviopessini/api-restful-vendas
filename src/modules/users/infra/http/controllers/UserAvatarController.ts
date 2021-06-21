import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateAvatar = container.resolve(UpdateUserAvatarService);
    const user = await updateAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename,
    });
    return response.status(200).json(classToClass(user));
  }
}
