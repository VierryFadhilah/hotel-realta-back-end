import { Injectable } from '@nestjs/common';
import { CreateStockDetailDto } from './dto/create-stock_detail.dto';
import { stock_detail } from 'models/purchasingSchema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class StockDetailService {
  async create(createStockDetailDto: CreateStockDetailDto) {
    const barcodeNumber =
      'BA' +
      uuidv4()
        .replace(/-/g, '')
        .substring(0, 10)
        .replace(/[a-zA-Z]/g, (char) => Math.floor(Math.random() * 10));
    const result = await stock_detail.create({
      stod_stock_id: createStockDetailDto.stod_stock_id,
      stod_barcode_number: barcodeNumber,
      stod_status: createStockDetailDto.stod_status,
      stod_notes: createStockDetailDto.stod_notes,
      stod_faci_id: createStockDetailDto.stod_faci_id,
      stod_pohe_id: createStockDetailDto.stod_pohe_id,
    });
    return {
      statusCode: 200,
      message: 'Success',
      data: result,
    };
  }

  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const result = await stock_detail.findAndCountAll({
      order: [['stod_id', 'ASC']],
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
    const result = await stock_detail.findOne({
      where: {
        stod_id: id,
      },
    });
    return {
      statusCode: 200,
      message: 'Success',
      data: result,
    };
  }

  async update(id: number, updateStockDetailDto: CreateStockDetailDto) {
    const result = await stock_detail.update(
      {
        // stod_stock_id: updateStockDetailDto.stod_stock_id,
        stod_status: updateStockDetailDto.stod_status,
        // stod_notes: updateStockDetailDto.stod_notes,
        stod_faci_id: updateStockDetailDto.stod_faci_id,
        // stod_pohe_id: updateStockDetailDto.stod_pohe_id,
      },
      {
        where: {
          stod_id: id,
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
    stock_detail.destroy({
      where: {
        stod_id: id,
      },
    });
    return {
      statusCode: 200,
      message: `Stock Detail dengan id-${id} telah terhapus`,
    };
  }
}
