import { Module } from '@nestjs/common';
import { PolicyCategoryGroupService } from './policy_category_group.service';
import { PolicyCategoryGroupController } from './policy_category_group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { policy_category_group } from 'models/masterSchema';

@Module({
  imports: [SequelizeModule.forFeature([policy_category_group])],
  controllers: [PolicyCategoryGroupController],
  providers: [PolicyCategoryGroupService],
})
export class PolicyCategoryGroupModule {}
