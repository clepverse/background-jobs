import nodemailer, { TransportOptions } from 'nodemailer';
import mailConfig from '../../config/mail';

interface MailTransportOptions extends TransportOptions {
  host: string;
  port: string;
  auth: {
    user: string;
    pass: string;
  };
}

export default nodemailer.createTransport(mailConfig as MailTransportOptions);
