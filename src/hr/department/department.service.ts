import { Injectable, HttpStatus } from '@nestjs/common';
import { department } from 'models/humanResourceSchema';
import { Op } from 'sequelize';

@Injectable()
export class DepartmentService {
  async create(createDepartmentDto: any) {
    // const  createDepartmentDto.name
    const result = await department.create({
      dept_name: createDepartmentDto.name,
    });
    return {
      statusCode: 200,
      data: {
        id: result.dept_id,
        name: result.dept_name,
      },
    };
  }

  findAll(page: number, entry: number): any;
  findAll(page: number, entry: number, search?: string): any;
  async findAll(page: number, entry: number, search?: string): Promise<any> {
    try {
      let dept_name: any;
      let totalPage: any;
      let totalData: any;

      if (search) {
        dept_name = {
          dept_name: {
            [Op.iLike]: `%${search}%`,
          },
        };
        totalData = await department.count({
          where: {
            dept_name: {
              [Op.iLike]: `%${search}%`,
            },
          },
        });
        totalPage = Math.ceil(totalData / entry);
      } else {
        totalData = await department.count();

        totalPage = Math.ceil(totalData / entry);
      }

      const from = entry * (page - 1);

      const result = await department.findAll({
        where: dept_name,
        limit: entry,
        offset: from,

        order: [['dept_id', 'ASC']],
      });
      const departmentList = [];
      for (let i = 0; i < result.length; i++) {
        const column = result[i];
        departmentList.push({
          id: column.dept_id,
          name: column.dept_name,
          modifiedDate: column.dept_modified_date,
        });
      }
      return {
        statusCode: 200,
        message: 'success',
        data: {
          department: departmentList,
          page: page,
          rows: entry,
          totalData,
          totalPage,
          from: from + 1,
          to: +from + result.length,
        },
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: error.message,
      };
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} department`;
  }

  async update(id: number, updateDepartmentDto: any) {
    try {
      const dept_name = updateDepartmentDto.name;

      const result = await department.update(
        { dept_name: dept_name },
        {
          where: {
            dept_id: id,
          },
        },
      );

      if (result[0]) {
        return {
          statusCode: 200,
          message: 'success',
          data: {
            id: id,
            name: dept_name,
          },
        };
      } else {
        throw new Error('You Cannot edit with Null Value');
      }
    } catch (error) {
      return {
        statusCode: 400,
        message: error.message,
      };
    }
  }

  async remove(id: number) {
    try {
      const result = await department.findOne({
        where: {
          dept_id: id,
        },
      });
      const dept_name = result.dept_name;
      const dept_id = result.dept_id;

      const resDelete = await department.destroy({
        where: {
          dept_id: id,
        },
      });
      if (!resDelete) {
        throw new Error('Oops! Something Error');
      }
      return {
        statusCode: 200,
        message: 'success',
        data: {
          id: dept_id, //number
          name: dept_name, //string
        },
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: error.message,
      };
    }
  }
}
