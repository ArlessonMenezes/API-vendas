import { hash } from 'bcryptjs';
import nodemailer from 'nodemailer';

async function ForgotPassword(req, res) {
  const { email } = req.body;

  try {

    const user = await Paciente.findOne({
      where: {
        email
      }
    })

    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      auth: {
        user: account.user,
        pass: account.pass,
      }
    })

    transporter.sendMail({
      from: 'equipe@mente_saudavel.com.br',
      to: email,
      subject: 'Recuperação de senha',
      html:'<p>Olá! Segue o link para redefinição da sua senha</p><br/><a href="localhost:3000/redefinir-senha">Redefinir senha</a>'
    }).then(
      () => {
          const hashedPassword = await hash(user.password, 10);

          Paciente.update({
            senha: hashedPassword}, {
              where: {
                id: user.id,
              }
            }
        ).then(() => {
          res.send('email enviado')
        })
      }
    )



  } catch(err) {
    return res.status(404).json({ message: 'User not found' });
  }
}