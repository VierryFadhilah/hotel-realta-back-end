import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailingService {
  constructor(private mailerService: MailerService) {}

  async sendEmail(email: string, token: string) {
    const url = `http://localhost:3000/users/resetPassword/${token}`;

    await this.mailerService.sendMail({
      from: '"Hotel Realta 👻" <no-reply@hotelrealta.com>', // sender address
      to: email,
      subject: 'Hotel Realta - Forgot Password',
      text: url,
      html: `<a href=${url} target="_blank">${url}</a>`,
    });
  }
}
