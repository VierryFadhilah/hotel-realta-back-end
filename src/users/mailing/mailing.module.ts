import { Module } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.ethereal.email',
        secure: false,
        auth: {
          user: 'omer.davis@ethereal.email',
          pass: 'XUwJbNnSZnZeTsN9YY',
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    }),
  ],
  providers: [MailingService],
  exports: [MailingService],
})
export class MailModule {}
