import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/user.repository";
import AppError from '../../../shared/errors/AppError';

type IRequest = {
  user_id: string;
}

export class ShowProfileService {

  async execute({ user_id }: IRequest) {
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findUserById(user_id);

    if (!user) {
      throw new AppError("User not found");
    }

    return user;
  }

}