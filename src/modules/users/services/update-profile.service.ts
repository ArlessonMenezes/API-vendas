import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/user.repository";
import AppError from '../../../shared/errors/AppError';
import { compare, hash } from "bcrypt";

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

export class UpdateProfileService {

  async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest) {

    const userRepository = getCustomRepository(UserRepository);
    const userExist = await userRepository.findUserById(user_id);

    if (!userExist) {
      throw new AppError("User not found");
    }

    const userUpdateEmail = await userRepository.findUserByEmail(email);

    if (userUpdateEmail && userUpdateEmail.id !== user_id) {
      throw new AppError("There is already one user with this email");
    }

    if (password && !old_password) {
      throw new AppError("Old password is required");
    }

    if (password && old_password) {
      const isMatch = compare(old_password, userExist.password);

      if (!isMatch) {
        throw new AppError("Old password is not match");
      }
    }

    userExist.password = await hash(password, 10);

    const user = await userRepository.update(user_id, {
      name,
      email,
    })

    return user;
  }
}