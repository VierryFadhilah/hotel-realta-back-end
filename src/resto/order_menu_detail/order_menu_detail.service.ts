import { Injectable } from '@nestjs/common';
import { CreateOrderMenuDetailDto } from './dto/create-order_menu_detail.dto';
import { UpdateOrderMenuDetailDto } from './dto/update-order_menu_detail.dto';
import { order_menu_detail } from 'models/restoSchema';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class OrderMenuDetailService {
  constructor(
    @InjectModel(order_menu_detail)
    private readonly orderMenuDetailService: typeof order_menu_detail,
  ) {}

  //menambahkan data order menu detail
  async create(
    createOrderMenuDetailDto: CreateOrderMenuDetailDto,
  ): Promise<any> {
    try {
      const subtotal = (
        Number(createOrderMenuDetailDto.orme_price) *
        createOrderMenuDetailDto.orme_qty
      ).toString();
      const orderMenus = await order_menu_detail.create({
        orme_price: createOrderMenuDetailDto.orme_price,
        orme_qty: createOrderMenuDetailDto.orme_qty,
        orme_subtotal: subtotal,
        orme_discount: createOrderMenuDetailDto.orme_discount,
        omde_orme_id: createOrderMenuDetailDto.omde_orme_id,
        omde_reme_id: createOrderMenuDetailDto.omde_reme_id,
      });
      const result = await orderMenus.save();
      return { message: `Data berhasil ditambahkan`, data: result };
    } catch (error) {
      return error;
    }
  }

  //menampilkan semua data order menu detail
  async findAll(): Promise<any> {
    try {
      const result = await order_menu_detail.findAll();
      if (!result[0]) {
        //jika tidak ada data data =0(kosong) tampilan perintah dibawah ini
        return `Data tidak di temukan`;
      } else {
        return { message: `Data di temukan`, data: result };
      }
    } catch (error) {
      return error;
    }
  }

  //menampilkan data yang di cari pada order menu detail
  async findOne(omde_id: number): Promise<any> {
    try {
      const result = await order_menu_detail.findOne({ where: { omde_id } });
      if (result) {
        return {
          message: `Order menu detail dengan id ${omde_id} di temukan`,
          data: result,
        };
      } else {
        return {
          message: `Order menu detail dengan id ${omde_id} tidak ditemukan`,
        };
      }
    } catch (error) {
      return error;
    }
  }

  //mengedit data yang pada resto_menu berdasarkan id yang di pilih
  async update(
    omde_id: number,
    updateOrderMenuDetailDto: UpdateOrderMenuDetailDto,
  ): Promise<any> {
    try {
      const orderMenuDetail = await order_menu_detail.findByPk(omde_id);
      if (!orderMenuDetail) {
        return `Data id ${omde_id} tidak ditemukan`;
      }

      const subtotal = (
        Number(updateOrderMenuDetailDto.orme_price) *
        updateOrderMenuDetailDto.orme_qty
      ).toString();

      await orderMenuDetail.update({
        orme_price: updateOrderMenuDetailDto.orme_price,
        orme_qty: updateOrderMenuDetailDto.orme_qty,
        orme_subtotal: subtotal,
        orme_discount: updateOrderMenuDetailDto.orme_discount,
        omde_orme_id: updateOrderMenuDetailDto.omde_orme_id,
        omde_reme_id: updateOrderMenuDetailDto.omde_reme_id,
      });

      return {
        message: `Data pada id ${omde_id} telah diperbarui`,
        data: orderMenuDetail,
      };
    } catch (error) {
      return error;
    }
  }

  //menghapus data yang pada order menu detail berdasarkan id yang di pilih
  async remove(omde_id: number): Promise<any> {
    try {
      const result = await order_menu_detail.destroy({ where: { omde_id } });
      if (!result) {
        return `Data id ${omde_id} tidak di temukan`;
      } else {
        return `Data id ${omde_id} berhasil di hapus`;
      }
    } catch (error) {
      return error;
    }
  }
}
