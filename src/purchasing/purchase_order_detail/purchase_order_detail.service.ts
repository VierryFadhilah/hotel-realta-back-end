import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderDetailDto } from './dto/create-purchase_order_detail.dto';
import { purchase_order_detail, stocks } from 'models/purchasingSchema';

@Injectable()
export class PurchaseOrderDetailService {
  async create(createPurchaseOrderDetailDto: CreatePurchaseOrderDetailDto) {
    const line_total =
      createPurchaseOrderDetailDto.pode_price *
      createPurchaseOrderDetailDto.pode_received_qty;
    const result = await purchase_order_detail.create({
      pode_pohe_id: createPurchaseOrderDetailDto.pode_pohe_id,
      pode_order_qty: createPurchaseOrderDetailDto.pode_order_qty,
      pode_price: createPurchaseOrderDetailDto.pode_price,
      pode_line_total: line_total,
      pode_received_qty: createPurchaseOrderDetailDto.pode_received_qty,
      pode_rejected_qty: createPurchaseOrderDetailDto.pode_rejected_qty,
      pode_stocked_qty: createPurchaseOrderDetailDto.pode_stocked_qty,
      pode_stock_id: createPurchaseOrderDetailDto.pode_stock_id,
    });
    return {
      statusCode: 200,
      message: 'Success',
      data: result,
    };
  }

  getAll() {
    const result = purchase_order_detail.findAll({
      order: [['pode_id', 'ASC']],
    });
    return result;
  }

  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const result = await purchase_order_detail.count({});
    const totalPages = Math.ceil(result / limit);
    const All = await purchase_order_detail.findAll({
      order: [['stod_id', 'ASC']],
      limit,
      offset,
    });
    return {
      statusCode: 200,
      message: 'Success',
      data: {
        totalPages,
        currentPage: page,
        data: All,
      },
    };
  }

  findOne(id: number) {
    const result = purchase_order_detail.findByPk(id);
    return result;
  }

  update(
    id: number,
    createPurchaseOrderDetailDto: CreatePurchaseOrderDetailDto,
  ) {
    const line_total =
      createPurchaseOrderDetailDto.pode_price *
      createPurchaseOrderDetailDto.pode_received_qty;
    const result = purchase_order_detail.update(
      {
        pode_pohe_id: createPurchaseOrderDetailDto.pode_pohe_id,
        pode_order_qty: createPurchaseOrderDetailDto.pode_order_qty,
        pode_price: createPurchaseOrderDetailDto.pode_price,
        pode_line_total: line_total,
        pode_received_qty: createPurchaseOrderDetailDto.pode_received_qty,
        pode_rejected_qty: createPurchaseOrderDetailDto.pode_rejected_qty,
        pode_stocked_qty: createPurchaseOrderDetailDto.pode_stocked_qty,
        pode_modified_date: new Date(),
        pode_stock_id: createPurchaseOrderDetailDto.pode_stock_id,
      },
      {
        where: {
          pode_id: id,
        },
      },
    );
    return result;
  }

  remove(id: number) {
    purchase_order_detail.destroy({
      where: {
        pode_id: id,
      },
    });
    return `This action removes a #${id} purchaseOrderDetail`;
  }

  async listOrderDetail(): Promise<any> {
    try {
      const result = await stocks.findAll({
        attributes: ['stock_name'],
        include: [
          {
            model: purchase_order_detail,
            attributes: [
              'pode_order_qty',
              'pode_price',
              'pode_received_qty',
              'pode_rejected_qty',
              'pode_line_total',
            ],
          },
        ],
      });
      return result;
    } catch (err) {
      return err;
    }
  }
}
