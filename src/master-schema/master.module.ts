import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AddressModule } from './address/address.module';
import { CategoryGroupModule } from './category_group/category_group.module';
import { PolicyModule } from './policy/policy.module';
import { PolicyCategoryGroupModule } from './policy_category_group/policy_category_group.module';

@Module({
  imports: [
    CategoryGroupModule,
    PolicyModule,
    PolicyCategoryGroupModule,
    // AddressModule
  ],
})
export class MasterModule {}
