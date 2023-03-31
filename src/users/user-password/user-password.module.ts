import { Module } from '@nestjs/common';
import { UserPasswordService } from './user-password.service';
import { UserPasswordController } from './user-password.controller';

@Module({
  controllers: [UserPasswordController],
  providers: [UserPasswordService],
})
export class UserPasswordModule {}
