import { Module } from '@nestjs/common';
import { PolicyService } from './policy.service';
import { PolicyController } from './policy.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { policy } from 'models/masterSchema';

@Module({
  imports: [SequelizeModule.forFeature([policy])],
  controllers: [PolicyController],
  providers: [PolicyService],
})
export class PolicyModule {}
