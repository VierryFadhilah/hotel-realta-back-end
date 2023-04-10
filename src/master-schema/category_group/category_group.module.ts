import { Module } from '@nestjs/common';
import { CategoryGroupService } from './category_group.service';
import { CategoryGroupController } from './category_group.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { category_group } from 'models/masterSchema';

@Module({
  imports: [SequelizeModule.forFeature([category_group])],
  controllers: [CategoryGroupController],
  providers: [CategoryGroupService],
  exports: [CategoryGroupService],
})
export class CategoryGroupModule {}
