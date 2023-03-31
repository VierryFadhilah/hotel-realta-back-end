import { Injectable } from '@nestjs/common';
import { CreateWorkorderDto } from './dto/create-workorder.dto';
import { UpdateWorkorderDto } from './dto/update-workorder.dto';
import {
  employee,
  work_order_detail,
  work_orders,
} from 'models/humanResourceSchema';
import { users } from 'models/usersSchema';
import { Op } from 'sequelize';
import sequelize from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { service_task } from 'models/masterSchema';
import { waitForDebugger } from 'inspector';

@Injectable()
export class WorkorderService {
  constructor(private readonly sequelize: Sequelize) {}
  async create(createWorkorderDto: any) {
    const result = await work_orders
      .create({
        woro_user_id: createWorkorderDto.userId,
        woro_start_date: createWorkorderDto.startDate,
      })
      .then((val) => {
        return val.woro_id;
      });
    return {
      statusCode: 200,
      message: 'success',
      data: {
        id: result,
      },
    };
  }

  findAll(page: number, entry: number): any;
  findAll(
    page: number,
    entry: number,
    status?: string,
    from?: any,
    to?: any,
  ): any;

  async findAll(
    page: number,
    entry: number,
    status?: string,
    from?: any,
    to?: any,
  ): Promise<any> {
    // eslint-disable-next-line prefer-const
    let where: any = {};

    if (status) {
      where.woro_status = status;
    }
    if (from && to) {
      where.woro_start_date = { [Op.between]: [from, to] };
    } else if (from) {
      where.woro_start_date = { [Op.gte]: from };
    } else if (to) {
      where.woro_start_date = { [Op.lte]: to };
    }

    const offset = entry * (page - 1);
    const totalData = await work_orders.count();
    const result = await work_orders.findAndCountAll({
      include: users,
      limit: entry,
      offset: offset,
      where,
    });
    const workorder = [];
    for (let i = 0; i < result.rows.length; i++) {
      const element = result.rows[i];
      workorder.push({
        id: element.woro_id,
        workorderDate: element.woro_start_date,
        status: element.woro_status,
        createdBy: element.user.user_full_name,
      });
    }

    const totalPage = Math.ceil(result.count / entry);
    return {
      statusCode: 200,
      message: 'success',
      data: {
        workorder,
        page: +page,
        rows: +entry,
        totalPage,
        totalData,
        from: offset + 1,
        to: +offset + result.rows.length,
      },
    };
  }

  async findOne(id: number) {
    const result = await work_orders.findByPk(id);
    return {
      statusCode: 200,
      message: 'success',
      data: { startDate: result.woro_start_date },
    };
  }

  async update(id: number, updateWorkorderDto: any) {
    const result = await work_orders
      .update(
        {
          woro_user_id: updateWorkorderDto.userId,
          woro_start_date: updateWorkorderDto.startDate,
        },
        {
          where: {
            woro_id: id,
          },
        },
      )
      .then((val) => {
        if (val[0]) {
          return {
            statusCode: 200,
            message: 'success',
            data: {
              id: +id,
            },
          };
        }
      })
      .catch((e) => {
        return e;
      });
    return result;
  }

  remove(id: number) {
    return `This action removes a #${id} workorder`;
  }

  async findDetail(id: number) {
    const result = await work_orders.findByPk(id, {
      include: work_order_detail,
    });

    const getName = async (woro_id: number) => {
      const userNAmeeee = await this.sequelize.query(
        `SELECT * FROM human_resource.get_user_work_order_details(${woro_id});`,
      );

      const dataIni: any = userNAmeeee[0];

      const fullName = dataIni[0].get_user_work_order_details;

      return fullName;
    };

    const workOrderDetail = [];
    for (let i = 0; i < result.work_order_details.length; i++) {
      const element = result.work_order_details[i];
      workOrderDetail.push({
        id: element.wode_id,
        taskname: element.wode_task_name,
        notes: element.wode_notes,
        status: element.wode_status,
        assignTo: await getName(1),
      });
    }

    return {
      statusCode: 200,
      message: 'success',
      data: {
        id: id,
        workorderDate: result.woro_start_date,
        status: result.woro_status,
        workOrderDetail,
      },
    };
  }

  async createDetail(body: any) {
    const startDate = new Date();
    const taskname = await service_task.findByPk(body.taskId);
    console.log(taskname.seta_name);

    const result = work_order_detail.create({
      wode_task_name: taskname.seta_name,
      wode_status: 'INPROGRESS',
      wode_start_date: startDate,
      wode_notes: body.notes,
      wode_emp_id: body.assignTo,
      wode_seta_id: body.taskId,
      wode_faci_id: body.faciId,
      wode_woro_id: body.workOrderId,
    });
    return { statusCode: 200, message: 'success' };
  }

  async findTask(query: any) {
    let where = {};
    if (query.tasklike) {
      where = {
        seta_name: { [Op.iLike]: `%${query.tasklike}%` },
      };
    }
    const dataList = await service_task.findAll({
      limit: 5,
      order: [['seta_name', 'ASC']],
      where,
    });
    const data = [];
    for (let i = 0; i < dataList.length; i++) {
      const element = dataList[i];
      data.push({
        id: element.seta_id,
        name: element.seta_name,
      });
    }
    // return data;
    return {
      statusCode: 200,
      message: 'success',
      data,
    };
  }

  async finduser(query: any) {
    const result: any = await this.sequelize.query(
      `select * from human_resource.emp_name`,
    );
    let data = result[0];
    if (query.namelike) {
      data = result[0].filter((obj: any) =>
        obj.user_full_name.includes(`${query.namelike}`),
      );
    }

    return {
      statusCode: 200,
      message: 'success',
      data,
    };
  }
}
