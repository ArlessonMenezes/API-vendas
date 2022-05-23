import nodemailer from 'nodemailer';

interface ISendMail {
  to: string;
  body: string;
}

export class EtherealMail {

  static async sendEmail({ to, body }: ISendMail) {
    const account = await nodemailer.createTestAccount();

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
      from: 'equipe@mente_saudavel.com.br',
      to,
      subject: 'Recuperação de senha',
      text: body,
    })

    console.log('Message sent: %s', message.messageId);
    console.log('Message sent: %s', nodemailer.getTestMessageUrl(message));
  }
}