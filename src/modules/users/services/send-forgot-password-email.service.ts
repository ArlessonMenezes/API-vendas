import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { UserRepository } from '../typeorm/repositories/user.repository';
import { TokenRepository } from '../typeorm/repositories/token.repository';

interface IRequest {
  email: string;
}


export class SendForgotPasswordEmailService {

  public async execute({ email }: IRequest): Promise<void> {
    const usersRepository = getCustomRepository(UserRepository);
    const userTokensRepository = getCustomRepository(TokenRepository);

    const user = await usersRepository.findUserByEmail(email);

    if (!user) {
      throw new AppError('User does not exists.');
    }
    console.log(user.email)
    const { token } = await userTokensRepository.generate(user.id);
  }
}