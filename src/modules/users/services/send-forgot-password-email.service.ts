import AppError from "@shared/errors/AppError";
import { getCustomRepository } from "typeorm";
import { UserRepository } from '../typeorm/repositories/user.repository';
import { TokenRepository } from '../typeorm/repositories/token.repository';
import { EtherealMail } from '@config/mail/ethereal.mail';

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

    const tokenObject = await userTokensRepository.generate(user.id);
    const { token } = tokenObject;

    await EtherealMail.sendEmail({
      to: email,
      body: `Solicitação de redefinição de senha recebida: ${token}`
    })
  }
}