import AppError from "@shared/errors/AppError";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { User } from "../typeorm/entities/User";
import { UserRepository } from '../typeorm/repositories/user.repository';

interface IAuth {
  email: string;
  password: string;
}

interface IResponse {
  user: User,
  token: string;
}

export class CreateSessionService {

  async execute(userAuth: IAuth) {
    const userRepository = getCustomRepository(UserRepository)

    const user = await userRepository.findUserByEmail(userAuth.email)

    if (!user) {
      throw new AppError("Incorrect email/Password combination", 401)
    }

    const passwordIsMatch = await compare(userAuth.password, user.password)

    if (!passwordIsMatch) {
      throw new AppError("Incorrect email/Password combination", 401)
    }

    //gerando token = sigin({ payload }, 'hash', { expiração do token })
    const token = sign({data: String( user.id )},
        'KHSFjlkhsf0(&09s8fHLKH@$IO&DoShflknsdlfnm.df', {
        expiresIn:'1d'
      },
    );

    return {
      user,
      token,
    }
  }
}