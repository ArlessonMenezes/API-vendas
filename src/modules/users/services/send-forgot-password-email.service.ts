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

    const { token } = await userTokensRepository.generate(user.id);


    await EtherealMail.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[]API Vendas] Recuperação de senha ',
      templateData: {
        template: `Olá {{ name }}: {{ token }}`,
        variables: {
          name: user.name,
          token,
        }
      }
    })
  }
}