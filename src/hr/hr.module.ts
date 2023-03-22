import { Module } from '@nestjs/common';
import { WorkorderModule } from './workorder/workorder.module';
import { DepartmentModule } from './department/department.module';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  department,
  employee,
  employee_department_history,
  employee_pay_history,
  job_role,
} from 'models/humanResourceSchema';
import { EmployeeModule } from './employee/employee.module';

@Module({
  imports: [
    SequelizeModule.forFeature([
      department,
      employee,
      employee_pay_history,
      employee_department_history,
      job_role,
    ]),
    WorkorderModule,
    DepartmentModule,
    EmployeeModule,
  ],
})
export class HrModule {}
