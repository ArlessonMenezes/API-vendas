import { getCustomRepository } from "typeorm";
import { UserRepository } from '../typeorm/repositories/user.repository';
import AppError from '../../../shared/errors/AppError';
import path from "path";
import uploadConfig from '@config/upload';
import fs from 'fs';
import { User } from "../typeorm/entities/User";

interface IAvatar {
  id: string;
  avatar: string;
}

export class UpdateUserAvatarService {

  async execute(data: IAvatar): Promise<User> {
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findUserById(data.id)

    if (!user) {
      throw new AppError('User not found')
    }

    if (user.avatar) {
      //pegando o caminho do avatar upload
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

      //pegando o status do avatar
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath)

      if (userAvatarFileExist) {
        //removendo avatar com unlink
        await fs.promises.unlink(userAvatarFilePath)
      }
    }

    await userRepository.update(user.id, {
      avatar: data.avatar
    })

    return user
  }

}