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
  shift,
  shift_detail,
  work_order_detail,
  work_orders,
} from 'models/HR/humanResourceSchema';
import { EmployeeModule } from './employee/employee.module';
import { users } from 'models/HR/usersSchema';
import { service_task } from 'models/HR/masterSchema';

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
      shift,
      shift_detail,
    ]),
    WorkorderModule,
    DepartmentModule,
    EmployeeModule,
  ],
})
export class HrModule {}
