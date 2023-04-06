import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { purchase_order_header, vendor } from 'models/purchasingSchema';
import { Op } from 'sequelize';

@Injectable()
export class VendorService {
  async create(createVendorDto: CreateVendorDto) {
    const result = await vendor.create({
      vendor_name: createVendorDto.vendor_name,
      vendor_active: createVendorDto.vendor_active,
      vendor_priority: createVendorDto.vendor_priority,
      vendor_register_date: new Date(createVendorDto.vendor_register_date),
      vendor_weburl: createVendorDto.vendor_weburl,
    });
    return {
      statusCode: 200,
      message: 'Success',
      data: result,
    };
  }

  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const vendors = await vendor.findAndCountAll({
      order: [['vendor_name', 'ASC']],
      limit,
      offset,
    });
    const totalPages = Math.ceil(vendors.count / limit);
    return {
      statusCode: 200,
      message: 'Success',
      data: {
        totalPages,
        currentPage: page,
        data: vendors.rows,
      },
    };
  }

  async getPages(page, limit, search?) {
    try {
      const pages = parseInt(page) || 0;
      const limits = parseInt(limit) || 2;
      const searchh = search || '';
      const offset = limits * (pages - 1);
      const totalRows = await vendor.count({
        where: {
          [Op.or]: [
            {
              vendor_name: {
                [Op.iLike]: '%' + searchh + '%',
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limits);
      const result = await vendor.findAll({
        where: {
          vendor_name: {
            [Op.iLike]: '%' + searchh + '%',
          },
        },
        offset: offset,
        limit: limit,
        order: [['vendor_name', 'ASC']],
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

  async findOne(vendor_name: any) {
    const result = await vendor.findAll({
      where: {
        vendor_name: {
          [Op.iLike]: `%${vendor_name}%`,
        },
      },
    });
    return {
      statusCode: 200,
      message: 'Success',
      data: {
        data: result,
      },
    };
  }

  async findByVendorName(name: string) {
    const result = await vendor.findOne({ where: { vendor_name: name } });
    return {
      statusCode: 200,
      message: 'Success',
      data: result,
    };
  }

  async update(id: number, createVendorDto: CreateVendorDto) {
    const result = await vendor.update(
      {
        vendor_name: createVendorDto.vendor_name,
        vendor_active: createVendorDto.vendor_active,
        vendor_priority: createVendorDto.vendor_priority,
        vendor_register_date: new Date(createVendorDto.vendor_register_date),
        vendor_weburl: createVendorDto.vendor_weburl,
        vendor_modified_date: new Date(),
      },
      {
        where: {
          vendor_entity_id: id,
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
    vendor.destroy({
      where: {
        vendor_entity_id: id,
      },
    });
    return {
      statusCode: 200,
      message: `Vendor dengan id-${id} telah terhapus`,
    };
  }

  async listOrder(page, limit, search?) {
    try {
      const pages = parseInt(page) || 0;
      const limits = parseInt(limit) || 2;
      const searchh = search || '';
      const offset = limits * (pages - 1);
      const totalRows = await purchase_order_header.count({
        include: [
          {
            model: vendor,
          },
        ],
        where: {
          [Op.or]: [
            {
              pohe_number: {
                [Op.iLike]: '%' + searchh + '%',
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limits);
      const result = await purchase_order_header.findAll({
        // attributes: [
        //   'pohe_id',
        //   'pohe_number',
        //   'pohe_order_date',
        //   'pohe_line_items',
        //   'pohe_total_amount',
        //   'pohe_status',
        // ],
        include: [
          {
            model: vendor,
            // attributes: ['vendor_name'],
          },
        ],
        where: {
          pohe_number: {
            [Op.iLike]: '%' + searchh + '%',
          },
        },
        offset: offset,
        limit: limit,
        order: [['pohe_number', 'ASC']],
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
}
