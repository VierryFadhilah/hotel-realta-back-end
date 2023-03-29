import { Injectable } from '@nestjs/common';
import { CreateVendorDto } from './dto/create-vendor.dto';
import { purchase_order_header, vendor } from 'models/purchasingSchema';

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

  // findAll() {
  //   const result = vendor.findAll({ order: [['vendor_entity_id', 'ASC']] });
  //   return result;
  // }
  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const vendors = await vendor.findAndCountAll({
      order: [['vendor_entity_id', 'ASC']],
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

  async findOne(id: number) {
    const result = await vendor.findByPk(id);
    return {
      statusCode: 200,
      message: 'Success',
      data: result,
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

  async listOrder(page: number, limit: number): Promise<any> {
    try {
      const offset = (page - 1) * limit;
      const result = await purchase_order_header.findAndCountAll({
        limit,
        offset,
        attributes: [
          'pohe_number',
          'pohe_order_date',
          'pohe_line_items',
          'pohe_total_amount',
          'pohe_status',
        ],
        include: [
          {
            model: vendor,
            attributes: ['vendor_name'],
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
}
