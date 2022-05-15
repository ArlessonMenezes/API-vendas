import { getCustomRepository } from "typeorm";
import { UserRepository } from "../typeorm/repositories/user.repository";

export class GetUserService {

  async execute() {
    const userRepository = getCustomRepository(UserRepository)

    const users = await userRepository.find()

    return users
  }

}