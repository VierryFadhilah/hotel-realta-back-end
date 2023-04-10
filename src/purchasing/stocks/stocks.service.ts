import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import {
  purchase_order_detail,
  purchase_order_header,
  stock_detail,
  stock_photo,
  stocks,
  vendor,
  vendor_product,
} from 'models/Purchasing/purchasingSchema';
import { facilities } from 'models/hotelSchema';
import { Sequelize } from 'sequelize-typescript';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';

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
      stock_quantity: 0,
      stock_reorder_point: createStockDto.stock_reorder_point,
      stock_used: 0,
      stock_scrap: 0,
      stock_size: createStockDto.stock_size,
      stock_color: createStockDto.stock_color,
    });
    return {
      statusCode: 200,
      message: 'Success',
      data: result,
    };
  }

  async findAll(page, limit, search?) {
    try {
      const pages = parseInt(page) || 0;
      const limits = parseInt(limit) || 2;
      const searchh = search || '';
      const offset = limits * (pages - 1);
      const totalRows = await stocks.count({
        include: [
          {
            model: stock_detail,
            include: [
              {
                model: purchase_order_header,
              },
            ],
          },
        ],
        where: {
          [Op.or]: [
            {
              stock_name: {
                [Op.iLike]: '%' + searchh + '%',
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limits);
      const result = await stocks.findAll({
        where: {
          stock_name: {
            [Op.iLike]: '%' + searchh + '%',
          },
        },
        include: [
          {
            model: stock_detail,
            include: [
              {
                model: purchase_order_header,
              },
            ],
          },
        ],
        offset: offset,
        limit: limit,
        order: [['stock_name', 'ASC']],
      });
      return {
        statusCode: 200,
        message: 'Success',
        data: {
          totalPage: totalPage,
          totalRows: totalRows,
          currentPage: pages,
          data: result,
        },
      };
    } catch (error) {
      return error;
    }
  }

  getAll() {
    const result = stocks.findAll({ order: [['stock_name', 'ASC']] });
    return result;
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
    const totalQty =
      (await vendor_product.sum('vepro_qty_stocked', {
        where: { vepro_stock_id: id },
      })) ?? 0;
    const rejectQty =
      (await purchase_order_detail.sum('pode_rejected_qty', {
        where: { pode_stock_id: id },
      })) ?? 0;
    const useQty =
      (await purchase_order_detail.sum('pode_received_qty', {
        where: { pode_stock_id: id },
      })) ?? 0;

    const result = await stocks.update(
      {
        stock_name: createStockDto.stock_name,
        stock_description: createStockDto.stock_description,
        stock_quantity: totalQty,
        stock_reorder_point: createStockDto.stock_reorder_point,
        stock_used: useQty,
        stock_scrap: rejectQty,
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
      const result = await vendor.findAndCountAll({
        limit,
        offset,
        include: [
          {
            model: vendor_product,
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
      return err;
    }
  }

  async stockVeproId(id: number): Promise<any> {
    try {
      // const offset = (page - 1) * limit;
      const result = await vendor.findAndCountAll({
        // limit,
        // offset,
        where: {
          vendor_entity_id: id,
        },
        include: [
          {
            model: vendor_product,
            include: [
              {
                model: stocks,
              },
            ],
          },
        ],
      });
      // const totalPages = Math.ceil(result.count / limit);
      return {
        statusCode: 200,
        message: 'Success',
        data: {
          // totalPages,
          // currentPage: page,
          data: result.rows,
        },
      };
    } catch (err) {
      return err;
    }
  }

  async stockVeproPag(page, limit, id) {
    try {
      const pages = parseInt(page) || 0;
      const limits = parseInt(limit) || 2;
      const offset = limits * (pages - 1);
      const totalRows = await vendor.count({
        include: [
          {
            model: vendor_product,
            include: [
              {
                model: stocks,
              },
            ],
          },
        ],
        where: {
          vendor_entity_id: id,
        },
      });
      const totalPage = Math.ceil(totalRows / limits);
      const result = await vendor.findAll({
        where: {
          vendor_entity_id: id,
        },
        include: [
          {
            model: vendor_product,
            include: [
              {
                model: stocks,
              },
            ],
          },
        ],
        offset: offset,
        limit: limit,
      });
      return {
        statusCode: 200,
        message: 'Success',
        data: {
          totalPage: totalPage,
          totalRows: totalRows,
          currentPage: pages,
          data: result,
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
        include: [
          {
            model: stock_detail,
            // attributes: ['stod_barcode_number', 'stod_status', 'stod_notes'],
            include: [
              {
                model: purchase_order_header,
                // attributes: ['pohe_number'],
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

  async stockDet(id: number): Promise<any> {
    try {
      // const offset = (page - 1) * limit;
      const result = await stocks.findOne({
        // limit,
        // offset,
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
            ],
          },
          // {
          //   model: facilities,
          // },
          // {
          //   model: purchase_order_header,
          // },
        ],
      });
      // const totalPages = Math.ceil(result.count / limit);
      return {
        statusCode: 200,
        message: 'Success',
        data: {
          // totalPages,
          // currentPage: page,
          data: result,
        },
      };
    } catch (err) {
      return err;
    }
  }

  async gallery(page, limit, search?) {
    try {
      const pages = parseInt(page) || 0;
      const limits = parseInt(limit) || 2;
      const searchh = search || '';
      const offset = limits * (pages - 1);
      const totalRows = await stock_photo.count({
        include: [
          {
            model: stocks,
            where: {
              [Op.or]: [
                {
                  stock_name: {
                    [Op.iLike]: '%' + searchh + '%',
                  },
                },
              ],
            },
            include: [
              {
                model: vendor_product,
                include: [
                  {
                    model: vendor,
                  },
                ],
              },
            ],
          },
        ],
      });
      const totalPage = Math.ceil(totalRows / limits);
      const result = await stock_photo.findAll({
        include: [
          {
            model: stocks,
            where: {
              [Op.or]: [
                {
                  stock_name: {
                    [Op.iLike]: '%' + searchh + '%',
                  },
                },
              ],
            },
            include: [
              {
                model: vendor_product,
                include: [
                  {
                    model: vendor,
                  },
                ],
              },
            ],
          },
        ],
        offset: offset,
        limit: limit,
        // order: [['stock_name', 'ASC']],
      });
      return {
        statusCode: 200,
        message: 'Success',
        data: {
          totalPage: totalPage,
          totalRows: totalRows,
          currentPage: pages,
          data: result,
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
