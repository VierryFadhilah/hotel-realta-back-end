import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { purchase_order_header, vendor } from 'models/Purchasing/purchasingSchema';
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

  async getAll() {
    const result = await vendor.findAll();
    return result;
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

  async getPages(page, limit, search?, searchPri?) {
    try {
      const pages = parseInt(page) || 0;
      const limits = parseInt(limit) || 2;
      const searchh = search || '';
      const searchPriority = searchPri || '';
      const offset = limits * (pages - 1);
      let where = {};
      if (search && searchPri) {
        where = {
          [Op.or]: [
            {
              vendor_priority: searchPriority,
              vendor_name: {
                [Op.iLike]: '%' + searchh + '%',
              },
            },
          ],
        };
      } else if (search) {
        where = {
          vendor_name: {
            [Op.iLike]: '%' + searchh + '%',
          },
        };
      } else if (searchPri) {
        where = {
          vendor_priority: searchPriority,
        };
      }
      const totalRows = await vendor.count({ where });
      const totalPage = Math.ceil(totalRows / limits);
      const result = await vendor.findAll({
        where,
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

  async listOrder(page, limit, search?, searchStat?) {
    try {
      const pages = parseInt(page) || 0;
      const limits = parseInt(limit) || 2;
      const searchh = search || '';
      const searchStatus = searchStat || '';
      const offset = limits * (pages - 1);
      let where = {};
      if (search && searchStat) {
        where = {
          [Op.or]: [
            {
              pohe_status: searchStatus,
              pohe_number: {
                [Op.iLike]: '%' + searchh + '%',
              },
            },
          ],
        };
      } else if (search) {
        where = {
          pohe_number: {
            [Op.iLike]: '%' + searchh + '%',
          },
        };
      } else if (searchStat) {
        where = {
          pohe_status: searchStatus,
        };
      }
      const totalRows = await purchase_order_header.count({
        include: [
          {
            model: vendor,
          },
        ],
        where,
      });
      const totalPage = Math.ceil(totalRows / limits);
      const result = await purchase_order_header.findAll({
        include: [
          {
            model: vendor,
          },
        ],
        where,
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
    } catch (error) {
      return error;
    }
  }
}
