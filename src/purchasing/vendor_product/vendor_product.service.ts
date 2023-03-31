import { Injectable } from '@nestjs/common';
import { CreateVendorProductDto } from './dto/create-vendor_product.dto';
import { vendor_product } from 'models/purchasingSchema';

@Injectable()
export class VendorProductService {
  async create(createVendorProductDto: CreateVendorProductDto) {
    const result = await vendor_product.create({
      vepro_qty_stocked: createVendorProductDto.vepro_qty_stocked,
      vepro_qty_remaining: createVendorProductDto.vepro_qty_remaining,
      vepro_price: createVendorProductDto.vepro_price,
      vepro_stock_id: createVendorProductDto.vepro_stock_id,
      vepro_vendor_id: createVendorProductDto.vepro_vendor_id,
    });
    return {
      statusCode: 200,
      message: 'Success',
      data: result,
    };
  }

  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const result = await vendor_product.findAndCountAll({
      order: [['vepro_id', 'ASC']],
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
    const result = await vendor_product.findByPk(id);
    return {
      statusCode: 200,
      message: 'Success',
      data: result,
    };
  }

  async update(id: number, createVendorProductDto: CreateVendorProductDto) {
    const result = await vendor_product.update(
      {
        vepro_qty_stocked: createVendorProductDto.vepro_qty_stocked,
        vepro_qty_remaining: createVendorProductDto.vepro_qty_remaining,
        vepro_price: createVendorProductDto.vepro_price,
        vepro_stock_id: createVendorProductDto.vepro_stock_id,
        vepro_vendor_id: createVendorProductDto.vepro_vendor_id,
      },
      {
        where: {
          vepro_id: id,
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
    vendor_product.destroy({
      where: {
        vepro_id: id,
      },
    });
    return {
      statusCode: 200,
      message: `Vendor product dengan id-${id} telah terhapus`,
    };
  }
}
