import { getCustomRepository } from "typeorm";
import { isAfter, addHours } from 'date-fns';
import { hash } from "bcryptjs";
import { TokenRepository } from "../typeorm/repositories/token.repository";
import { UserRepository } from "../typeorm/repositories/user.repository";
import AppError from '../../../shared/errors/AppError';

interface IResetPassword {
  token: string;
  password: string;
}

export class ResetPasswprdService {

  async execute(resetPassword: IResetPassword) {
    const userRepository = getCustomRepository(UserRepository)
    const tokenRepository = getCustomRepository(TokenRepository)

    const userToken = await tokenRepository.findByToken(resetPassword.token)

    if (!userToken) {
      throw new AppError('Token does not exist')
    }

    const user = await userRepository.findUserById(userToken.user_id)

    if (!user) {
      throw new AppError('User does not exist')
    }

    //pega o momento q o token foi criado mais 2hrs
    const tokenCreatedAt = userToken.created_at
    const compareDate = addHours(tokenCreatedAt, 2)

    //verificar se o Date.now já passou do compareDate
    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired')
    }

    const hashedPassword = await hash(resetPassword.password, 10)
    user.password = hashedPassword
  }

}