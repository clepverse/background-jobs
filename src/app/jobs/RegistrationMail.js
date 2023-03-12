import Mail from '../lib/Mail';

export default {
  key: 'RegistrationMail',
  async handle({ data }) {
    const { user } = data;

    await Mail.sendMail({
      from: 'Queue <queue@example.com>',
      to: `${user.name} <${user.email}>`,
      subject: 'Cadastro de usuário!',
      html: `<p>Olá ${user.name}, seja bem vindo ao nosso site!</p>`,
    });
  },
};
