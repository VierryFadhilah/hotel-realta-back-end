import { Module } from '@nestjs/common';
import { UserBonusPointsService } from './user-bonus-points.service';
import { UserBonusPointsController } from './user-bonus-points.controller';

@Module({
  controllers: [UserBonusPointsController],
  providers: [UserBonusPointsService]
})
export class UserBonusPointsModule {}
