import { Injectable, HttpStatus } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { department } from 'models/humanResourceSchema';

@Injectable()
export class DepartmentService {
  create(createDepartmentDto: CreateDepartmentDto) {
    return 'This action adds a new department';
  }

  findAll(page: number, entry: number): any;
  findAll(page: number, entry: number, search?: string): any;
  async findAll(page: number, entry: number, search?: string): Promise<any> {
    try {
      const from = entry * (page - 1);
      const totalData = await department.count();
      const result = await department.findAll({
        limit: entry,
        offset: from,

        order: [['dept_id', 'ASC']],
      });

      return {
        statusCode: 200,
        message: 'success',
        data: {
          department: result,
          page: page,
          rows: entry,
          totalData,
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

  update(id: number, updateDepartmentDto: UpdateDepartmentDto) {
    return `This action updates a #${id} department`;
  }

  remove(id: number) {
    return `This action removes a #${id} department`;
  }
}
