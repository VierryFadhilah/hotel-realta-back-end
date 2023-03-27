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
  work_order_detail,
  work_orders,
} from 'models/humanResourceSchema';
import { EmployeeModule } from './employee/employee.module';
import { users } from 'models/usersSchema';
import { service_task } from 'models/masterSchema';

@Module({
  imports: [
    SequelizeModule.forFeature([
      department,
      employee,
      employee_pay_history,
      employee_department_history,
      job_role,
      work_orders,
      users,
      work_order_detail,
      service_task,
    ]),
    WorkorderModule,
    DepartmentModule,
    EmployeeModule,
  ],
})
export class HrModule {}
