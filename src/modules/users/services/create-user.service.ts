import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/user.repository";
import { hash } from 'bcryptjs';

interface IUser {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {

  async execute(user: IUser) {
    const userRepository = getCustomRepository(UserRepository)
    const emailExist = await userRepository.findUserByEmail(user.email)

    if (emailExist) {
      throw new AppError("E-mail adress alread used")
    }

    const hashedPassword = await hash(user.password, 10)

    return await userRepository.save(
      userRepository.create({
        name: user.name,
        email: user.email,
        password: hashedPassword,
      })
    )
  }
}