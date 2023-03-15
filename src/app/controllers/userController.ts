import { Request, Response } from 'express';
import Queue from '../lib/Queue';

interface IUser {
  name: string;
  email: string;
  password: string;
}

class UserController {
  async store(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const user: IUser = {
      name,
      email,
      password,
    };

    await Queue.add('RegistrationMail', { user });

    return res.json(user);
  }
}

export default UserController;
