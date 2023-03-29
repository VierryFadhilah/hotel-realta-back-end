import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import {
  purchase_order_header,
  stock_detail,
  stock_photo,
  stocks,
  vendor_product,
} from 'models/purchasingSchema';
import { facilities } from 'models/hotelSchema';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class StocksService {
  constructor(
    @InjectModel(stocks) private stocksModel: typeof stocks,
    private sequelize: Sequelize,
  ) {}

  async create(createStockDto: CreateStockDto) {
    const result = await stocks.create({
      stock_name: createStockDto.stock_name,
      stock_description: createStockDto.stock_description,
      stock_quantity: createStockDto.stock_quantity,
      stock_reorder_point: createStockDto.stock_reorder_point,
      stock_used: createStockDto.stock_used,
      stock_scrap: createStockDto.stock_scrap,
      stock_size: createStockDto.stock_size,
      stock_color: createStockDto.stock_color,
    });
    return {
      statusCode: 200,
      message: 'Success',
      data: result,
    };
  }

  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const result = await stocks.findAndCountAll({
      order: [['stock_id', 'ASC']],
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
    const result = await stocks.findByPk(id);
    return {
      statusCode: 200,
      message: 'Success',
      data: result,
    };
  }

  async findByStocksName(name: string) {
    const result = await stocks.findOne({ where: { stock_name: name } });
    return {
      statusCode: 200,
      message: 'Success',
      data: result,
    };
  }

  async update(id: number, createStockDto: CreateStockDto) {
    const result = await stocks.update(
      {
        stock_name: createStockDto.stock_name,
        stock_description: createStockDto.stock_description,
        stock_quantity: createStockDto.stock_quantity,
        stock_reorder_point: createStockDto.stock_reorder_point,
        stock_used: createStockDto.stock_used,
        stock_scrap: createStockDto.stock_scrap,
        stock_size: createStockDto.stock_size,
        stock_color: createStockDto.stock_color,
        stock_modified_date: new Date(),
      },
      {
        where: {
          stock_id: id,
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
    stocks.destroy({
      where: {
        stock_id: id,
      },
    });
    return {
      statusCode: 200,
      message: `Stocks dengan id-${id} telah terhapus`,
    };
  }

  async stockVepro(page: number, limit: number): Promise<any> {
    try {
      const offset = (page - 1) * limit;
      const result = await stocks.findAndCountAll({
        limit,
        offset,
        attributes: ['stock_name'],
        include: [
          {
            model: vendor_product,
            attributes: [
              'vepro_qty_stocked',
              'vepro_qty_remaining',
              'vepro_price',
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
      return err;
    }
  }

  async stockDetail(page: number, limit: number): Promise<any> {
    try {
      const offset = (page - 1) * limit;
      const result = await facilities.findAndCountAll({
        limit,
        offset,
        attributes: ['hofa_faci_room_number'],
        include: [
          {
            model: stock_detail,
            attributes: ['stod_barcode_number', 'stod_status', 'stod_notes'],
            include: [
              {
                model: purchase_order_header,
                attributes: ['pohe_number'],
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
      return err;
    }
  }

  async stockDet(page: number, limit: number, id: number): Promise<any> {
    try {
      const offset = (page - 1) * limit;
      const result = await stocks.findAndCountAll({
        limit,
        offset,
        where: {
          stock_id: id,
        },
        include: [
          {
            model: stock_detail,
            include: [
              {
                model: purchase_order_header,
              },
              {
                model: facilities,
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
      return err;
    }
  }

  async gallery(page: number, limit: number): Promise<any> {
    try {
      const offset = (page - 1) * limit;
      const result = await stock_photo.findAndCountAll({
        limit,
        offset,
        attributes: ['spho_photo_filename'],
        include: [
          {
            model: stocks,
            attributes: ['stock_name', 'stock_reorder_point'],
            include: [
              {
                model: vendor_product,
                attributes: ['vepro_qty_stocked', 'vepro_price'],
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
      return err;
    }
  }

  //VIEW
  async getListOrder() {
    try {
      const result = await this.sequelize.query('select * from "listOrder"');
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getGallery() {
    try {
      const result = await this.sequelize.query('select * from "gallery"');
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getListOrderDetail() {
    try {
      const result = await this.sequelize.query(
        'select * from "listOrderDetail"',
      );
      return result;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
