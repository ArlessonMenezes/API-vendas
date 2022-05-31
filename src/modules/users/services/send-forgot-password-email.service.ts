import { EtherealMail } from '../../../config/mail/Ethereal.mail';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import path from 'path';
import { TokenRepository } from '../typeorm/repositories/token.repository';
import { UserRepository } from '../typeorm/repositories/user.repository';

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

    const forgotPasswordTemplate = path.resolve(
      __dirname,
      '..',
      'views',
      'forgot-password.hbs'
    )

    await EtherealMail.sendEmail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: '[API Vendas] Recuperação de senha ',
      templateData: {
        file: forgotPasswordTemplate,
        variables: {
          name: user.name,
          link: `http://localhost:3000/reset_password?token=${token}`
        }
      }
    })
  }
}