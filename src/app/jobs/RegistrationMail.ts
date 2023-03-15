import Mail from '../lib/Mail';

interface UserData {
  name: string;
  email: string;
}

interface RegistrationMailData {
  user: UserData;
}

interface MailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

interface MailError {
  message?: string | undefined;
}

class MailErrorImpl extends Error implements MailError {
  constructor(message?: string) {
    super(message);
    Object.setPrototypeOf(this, MailErrorImpl.prototype);
  }
}

export default {
  key: 'RegistrationMail',
  options: {
    delay: 5000,
    attempts: 5,
  },
  async handle({ data }: { data: RegistrationMailData }): Promise<void> {
    const { user } = data;

    try {
      const mailOptions: MailOptions = {
        from: 'Queue <queue@example.com>',
        to: `${user.name} <${user.email}>`,
        subject: 'Cadastro de usuário!',
        html: `<p>Olá ${user.name}, seja bem vindo ao nosso site!</p>`,
      };
      await Mail.sendMail(mailOptions);
    } catch (err) {
      console.log('QUEUE ERROR [MAIL]:', (err as MailError)?.message);
      throw new MailErrorImpl('Erro ao enviar e-mail');
    }
  },
};
