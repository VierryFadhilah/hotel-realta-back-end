import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { users } from 'models/usersSchema';

@Module({
  imports: [SequelizeModule.forFeature([users]), UsersModule],
})
export class UsersTModule {}
