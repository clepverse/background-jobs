import Queue from '../lib/Queue';

class UserController {
  async store(req, res) {
    const { name, email } = req.body;

    const user = {
      name,
      email,
    };

    await Queue.add('RegistrationMail', { user });

    return res.status(201).json({ user });
  }
}

export default UserController;
