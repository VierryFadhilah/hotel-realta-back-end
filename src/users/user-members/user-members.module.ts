import { Module } from '@nestjs/common';
import { UserMembersService } from './user-members.service';
import { UserMembersController } from './user-members.controller';

@Module({
  controllers: [UserMembersController],
  providers: [UserMembersService],
})
export class UserMembersModule {}
