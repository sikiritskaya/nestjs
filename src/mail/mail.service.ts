import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/user.model';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendActivationMail(username:string, email:string, confirmationCode:string) {
    const url = `http://localhost:8000/api/activate/${confirmationCode}`;
    await this.mailerService.sendMail({
      from: process.env.MY_EMAIL,
      to: email,
      subject: 'confirm your account',
      template: './confirmation',
      context: { 
        name: username,
        url,
      },
    });
  }
}

