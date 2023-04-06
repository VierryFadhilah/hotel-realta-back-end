import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import {
  user_bonus_points,
  user_members,
  user_password,
  user_profiles,
  user_roles,
  users,
} from 'models/usersSchema';
import { UserMembersModule } from './user-members/user-members.module';
import { UserBonusPointsModule } from './user-bonus-points/user-bonus-points.module';
import { RolesModule } from './roles/roles.module';
import { AuthModule } from './auth/auth.module';
import { employee } from 'models/humanResourceSchema';

@Module({
  imports: [
    SequelizeModule.forFeature([
      users,
      // user_password,
      user_profiles,
      user_members,
      user_bonus_points,
      user_roles,
      employee,
    ]),
    UsersModule,
    UserMembersModule,
    UserBonusPointsModule,
    RolesModule,
    AuthModule,
  ],
})
export class UsersTModule {}
