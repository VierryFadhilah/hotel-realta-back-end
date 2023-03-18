import { Module } from '@nestjs/common';
import { WorkorderModule } from './workorder/workorder.module';
import { DepartmentModule } from './department/department.module';

@Module({
  imports: [WorkorderModule, DepartmentModule],
})
export class HrModule {}
