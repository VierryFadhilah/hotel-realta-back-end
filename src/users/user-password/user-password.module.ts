import { Module } from '@nestjs/common';
import { UserPasswordService } from './user-password.service';
import { UserPasswordController } from './user-password.controller';
import { MailerService } from '@nestjs-modules/mailer';
import { MailModule } from '../mailing/mailing.module';

@Module({
  imports: [MailModule],
  controllers: [UserPasswordController],
  providers: [UserPasswordService],
})
export class UserPasswordModule {}
