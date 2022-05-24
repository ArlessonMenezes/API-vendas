import nodemailer from 'nodemailer';
import { ITemplateVariable, IParseMailTemplate, HandlebarsTemplate } from '@config/mail/Handlebars-mail.template'

interface IMailContact {
  name: string;
  email: string;
}

interface ISendMail {
  to: IMailContact;
  from?: IMailContact;
  subject: string;
  templateData: IParseMailTemplate;
}

export class EtherealMail {

  static async sendEmail({ to, from, subject, templateData }: ISendMail) {
    const account = await nodemailer.createTestAccount();
    const handlebarsTemplate = new HandlebarsTemplate()

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      }
    });

    const message = await transporter.sendMail({
      from: {
        name: from?.name || 'Equipe API Vendas',
        address: from?.email || 'equipe@vendas.com.br',
      },
      to: {
        name: to.name,
        address: to.email,
      },
      subject,
      html: await handlebarsTemplate.parser(templateData),
    })

    console.log('Message sent: %s', message.messageId);
    console.log('Message sent: %s', nodemailer.getTestMessageUrl(message));
  }
}