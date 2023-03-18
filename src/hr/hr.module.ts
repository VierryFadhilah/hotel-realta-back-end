import { Module } from '@nestjs/common';
import { WorkorderModule } from './workorder/workorder.module';
import { DepartmentModule } from './department/department.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { department } from 'models/humanResourceSchema';

@Module({
  imports: [
    WorkorderModule,
    DepartmentModule,
    SequelizeModule.forFeature([department]),
  ],
})
export class HrModule {}
