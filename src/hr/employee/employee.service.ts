import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import {
  department,
  employee,
  employee_department_history,
  employee_pay_history,
  job_role,
} from 'models/humanResourceSchema';
import { Sequelize } from 'sequelize-typescript';
import { unlink } from 'fs';
import { join } from 'path';

@Injectable()
export class EmployeeService {
  constructor(private readonly sequelize: Sequelize) {}

  create(createEmployeeDto: CreateEmployeeDto) {
    return 'This action adds a new employee';
  }
  findAll(page: number, entry: number): any;
  findAll(page: number, entry: number, search?: string, status?: string): any;
  async findAll(
    page: number,
    entry: number,
    search?: string,
    status?: string,
  ): Promise<any> {
    let currentFlag = ``;
    let like = ``;

    if (search) {
      like = ``;
    }

    if (status) {
      currentFlag = `, '${status}' `;
    }
    const from = entry * (page - 1);

    const totalData = await employee.count();
    const result = await this.sequelize.query(
      `select * from human_resource.show_employee_info_by_name('${like}',${entry}, ${from}  ${currentFlag})`,
    );

    return {
      statusCode: 200,
      message: 'success',
      data: {
        employee: result[0],
        page: page,
        rows: entry,
        totalData,
        from: from + 1,
        to: +from + result[0].length,
      },
    };
  }

  async findOne(id: number) {
    const result = await this.sequelize.query(
      `select * from human_resource.get_employee_for_update2(${id})`,
    );

    return {
      statusCode: 200,
      message: 'success',
      data: result[0][0],
    };
  }

  async update(id: number, updateEmployeeDto: any, filename?: string) {
    try {
      const employeeList = await employee.findByPk(id);
      const lastPayData = await employee_pay_history.findAll({
        where: {
          ephi_emp_id: id,
        },
        order: [['ephi_rate_change_date', 'DESC']],
        limit: 1,
      });
      const lastPay = lastPayData[0];
      const lastDeptData = await employee_department_history.findAll({
        where: {
          edhi_emp_id: id,
        },
        order: [['edhi_id', 'DESC']],
        limit: 1,
      });
      const lastDept = lastDeptData[0];
      const general = JSON.parse(updateEmployeeDto.general);
      const salary = JSON.parse(updateEmployeeDto.salary);
      const assigment = JSON.parse(updateEmployeeDto.assigment);
      const shift = JSON.parse(updateEmployeeDto.shift);

      const updateEmployee = async (emp_photo: string) => {
        const updateEmployee = await employee
          .update(
            {
              emp_national_id: general.nationalId,
              emp_birth_date: general.birth,
              emp_hire_date: general.hireDate,
              emp_salaried_flag: general.salariedFlag,
              emp_marital_status: general.status,
              emp_gender: general.gender,
              emp_current_flag: general.currentFlag,
              emp_vacation_hours: general.vacationHours,
              emp_sickleave_hours: general.sickLeaveHours,
              emp_joro_id: general.jobRole,
              emp_photo,
            },
            {
              where: {
                emp_id: id,
              },
            },
          )
          .then(async () => {
            if (
              lastPay.ephi_rate_salary != salary.salary &&
              lastPay.ephi_pay_frequence != salary.frequency
            ) {
              const result = await employee_pay_history.create({
                ephi_emp_id: id,
                ephi_pay_frequence: salary.frequency,
                ephi_rate_salary: salary.salary,
              });
            }
          })
          .then(async () => {
            if (
              lastDept.edhi_dept_id != assigment.department &&
              lastDept.edhi_start_date != assigment.startDate &&
              lastDept.edhi_end_date != assigment.endDate
            ) {
              const result = await employee_department_history.create({
                edhi_emp_id: id,
                edhi_dept_id: assigment.department,
                edhi_start_date: assigment.startDate,
                edhi_end_date: assigment.endDate,
                edhi_shift_id: shift.shift,
              });
            }
          })
          .catch((e) => {
            throw new Error(e.message);
          });
      };

      let emp_photo: any;
      if (filename) {
        emp_photo = filename;
        const deleted = unlink(
          join(
            __dirname,
            `../../../../uploads/image/human_resource/${employeeList.emp_photo}`,
          ),
          async (err) => {
            if (err) {
              return err;
            } else {
              updateEmployee(emp_photo);
            }
          },
        );
      } else {
        updateEmployee(emp_photo);
      }

      return {
        statusCode: 200,
        message: 'success',
        data: {
          message: `data berhasil di ubah dengan ID = ${id}`,
        },
      };
    } catch (error) {
      return error;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} employee`;
  }

  async findJobRole() {
    const result = await job_role.findAll();
    const jobRole = [];

    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      jobRole.push({
        id: element.joro_id,
        name: element.joro_name,
      });
    }

    return {
      statusCode: 200,
      message: 'success',
      data: {
        jobRole,
      },
    };
  }
  async findDepartment() {
    const result = await department.findAll();
    const departmentList = [];
    for (let i = 0; i < result.length; i++) {
      const element = result[i];
      departmentList.push({
        id: element.dept_id,
        name: element.dept_name,
      });
    }

    return {
      statusCode: 200,
      message: 'success',
      data: {
        department: departmentList,
      },
    };
  }
}
