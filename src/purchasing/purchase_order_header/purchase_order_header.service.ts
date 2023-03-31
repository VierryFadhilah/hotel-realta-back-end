import { Injectable } from '@nestjs/common';
import { CreatePurchaseOrderHeaderDto } from './dto/create-purchase_order_header.dto';
import {
  purchase_order_detail,
  purchase_order_header,
  stocks,
} from 'models/purchasingSchema';

@Injectable()
export class PurchaseOrderHeaderService {
  async create(createPurchaseOrderHeaderDto: CreatePurchaseOrderHeaderDto) {
    const currentDate = new Date();
    const formattedDate = currentDate
      .toISOString()
      .slice(0, 10)
      .replace(/-/g, '');

    const lastPurchaseOrderHeader = await purchase_order_header.findOne({
      order: [['pohe_number', 'DESC']],
    });

    let lastNumber = 0;
    if (lastPurchaseOrderHeader) {
      const lastPoheNumber = lastPurchaseOrderHeader.pohe_number;
      const lastNumberStr = lastPoheNumber.substring(lastPoheNumber.length - 3);
      lastNumber = parseInt(lastNumberStr, 10);
    }

    const nextNumber = lastNumber + 1;
    const paddedNumber = nextNumber.toString().padStart(3, '0');
    const poheNumber = `PO-${formattedDate}-${paddedNumber}`;

    const result = await purchase_order_header.create({
      pohe_number: poheNumber,
      pohe_status: createPurchaseOrderHeaderDto.pohe_status,
      pohe_order_date: new Date(createPurchaseOrderHeaderDto.pohe_order_date),
      pohe_subtotal: createPurchaseOrderHeaderDto.pohe_subtotal,
      pohe_tax: createPurchaseOrderHeaderDto.pohe_tax,
      pohe_total_amount: createPurchaseOrderHeaderDto.pohe_total_amount,
      pohe_refund: createPurchaseOrderHeaderDto.pohe_refund,
      pohe_arrival_date: new Date(
        createPurchaseOrderHeaderDto.pohe_arrival_date,
      ),
      pohe_pay_type: createPurchaseOrderHeaderDto.pohe_pay_type,
      pohe_emp_id: createPurchaseOrderHeaderDto.pohe_emp_id,
      pohe_vendor_id: createPurchaseOrderHeaderDto.pohe_vendor_id,
      pohe_line_items: createPurchaseOrderHeaderDto.pohe_line_items,
    });
    return {
      statusCode: 200,
      message: 'Success',
      data: result,
    };
  }

  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const result = await purchase_order_header.findAndCountAll({
      order: [['pohe_id', 'ASC']],
      limit,
      offset,
    });
    const totalPages = Math.ceil(result.count / limit);
    return {
      statusCode: 200,
      message: 'Success',
      data: {
        totalPages,
        currentPage: page,
        data: result.rows,
      },
    };
  }

  async findOne(id: number) {
    const result = await purchase_order_header.findByPk(id);
    return {
      statusCode: 200,
      message: 'Success',
      data: result,
    };
  }

  async update(
    id: number,
    createPurchaseOrderHeaderDto: CreatePurchaseOrderHeaderDto,
  ) {
    const result = await purchase_order_header.update(
      {
        pohe_status: createPurchaseOrderHeaderDto.pohe_status,
        pohe_order_date: new Date(createPurchaseOrderHeaderDto.pohe_order_date),
        pohe_subtotal: createPurchaseOrderHeaderDto.pohe_subtotal,
        pohe_tax: createPurchaseOrderHeaderDto.pohe_tax,
        pohe_total_amount: createPurchaseOrderHeaderDto.pohe_total_amount,
        pohe_refund: createPurchaseOrderHeaderDto.pohe_refund,
        pohe_arrival_date: new Date(
          createPurchaseOrderHeaderDto.pohe_arrival_date,
        ),
        pohe_pay_type: createPurchaseOrderHeaderDto.pohe_pay_type,
        pohe_emp_id: createPurchaseOrderHeaderDto.pohe_emp_id,
        pohe_vendor_id: createPurchaseOrderHeaderDto.pohe_vendor_id,
        pohe_line_items: createPurchaseOrderHeaderDto.pohe_line_items,
      },
      {
        where: {
          pohe_id: id,
        },
      },
    );
    return {
      statusCode: 200,
      message: 'Success',
      data: result,
    };
  }

  remove(id: number) {
    purchase_order_header.destroy({
      where: {
        pohe_id: id,
      },
    });
    return {
      statusCode: 200,
      message: `Purcase order dengan id-${id} telah terhapus`,
    };
  }

  async listOrderDetail(page: number, limit: number, po: string): Promise<any> {
    try {
      const offset = (page - 1) * limit;
      const result = await purchase_order_header.findAndCountAll({
        limit,
        offset,
        where: {
          pohe_number: po,
        },
        include: [
          {
            model: purchase_order_detail,
            include: [
              {
                model: stocks,
              },
            ],
          },
        ],
      });
      const totalPages = Math.ceil(result.count / limit);
      return {
        statusCode: 200,
        message: 'Success',
        data: {
          totalPages,
          currentPage: page,
          data: result.rows,
        },
      };
    } catch (err) {
      throw new Error(err);
    }
  }
}
