import { Injectable } from '@nestjs/common';
import { CreateOrderMenuDto } from './dto/create-order_menu.dto';
import { UpdateOrderMenuDto } from './dto/update-order_menu.dto';
import { order_menu_detail, order_menus } from 'models/restoSchema';
import { OrderMenuDetailService } from '../order_menu_detail/order_menu_detail.service';
import { CreateOrderMenuDetailDto } from '../order_menu_detail/dto/create-order_menu_detail.dto';

@Injectable()
export class OrderMenusService {
  constructor(
    private readonly orderMenuDetailService: OrderMenuDetailService,
  ) {}
  //menambahkan data order menu
  async create(createOrderMenuDto: CreateOrderMenuDto): Promise<any> {
    try {
      const orderMenus = await order_menus.create({
        orme_order_number: createOrderMenuDto.orme_order_number,
        orme_order_date: createOrderMenuDto.orme_order_date,
        orme_total_item: createOrderMenuDto.orme_total_item,
        orme_total_discount: createOrderMenuDto.orme_total_discount,
        orme_total_amount: createOrderMenuDto.orme_total_amount,
        orme_pay_type: createOrderMenuDto.orme_pay_type,
        orme_cardnumber: createOrderMenuDto.orme_cardnumber,
        orme_is_paid: createOrderMenuDto.orme_is_paid,
        orme_user_id: createOrderMenuDto.orme_user_id,
      });
      const result = await orderMenus.save();
      return {
        status: 200,
        message: `Data berhasil ditambahkan`,
        data: result,
      };
    } catch (error) {
      return { status: 400, message: error };
    }
  }

  //menampilkan semua data order menu
  async findAll(): Promise<any> {
    try {
      const result = await order_menus.findAll();
      if (!result[0]) {
        //jika tidak ada data data =0(kosong) tampilan perintah dibawah ini
        return { status: 400, messagge: `Data tidak di temukan` };
      } else {
        return { status: 200, message: `Data di temukan`, data: result };
      }
    } catch (error) {
      return { status: 400, message: error };
    }
  }

  //menampilkan data yang pada order menu berdasarkan id yang di pilih
  async findOne(orme_id: number): Promise<any> {
    try {
      const result = await order_menus.findOne({ where: { orme_id } });
      if (result) {
        return {
          status: 200,
          message: `Order menu detail dengan id ${orme_id} di temukan`,
          data: result,
        };
      } else {
        return {
          status: 400,
          message: `Order menu detail dengan id ${orme_id} tidak ditemukan`,
        };
      }
    } catch (error) {
      return error;
    }
  }

  //mengedit data yang pada order menu berdasarkan id yang di pilih
  async update(
    orme_id: number,
    updateOrderMenuDto: UpdateOrderMenuDto,
  ): Promise<any> {
    try {
      const orderMenuDetail = await order_menus.findByPk(orme_id);
      if (!orderMenuDetail) {
        return { status: 400, message: `Data id ${orme_id} tidak ditemukan` };
      }

      await orderMenuDetail.update({
        orme_order_number: updateOrderMenuDto.orme_order_number,
        orme_order_date: updateOrderMenuDto.orme_order_date,
        orme_total_item: updateOrderMenuDto.orme_total_item,
        orme_total_discount: updateOrderMenuDto.orme_total_discount,
        orme_total_amount: updateOrderMenuDto.orme_total_amount,
        orme_pay_type: updateOrderMenuDto.orme_pay_type,
        orme_cardnumber: updateOrderMenuDto.orme_cardnumber,
        orme_is_paid: updateOrderMenuDto.orme_is_paid,
        orme_user_id: updateOrderMenuDto.orme_user_id,
      });

      return {
        status: 200,
        message: `Data pada id ${orme_id} telah diperbarui`,
        data: orderMenuDetail,
      };
    } catch (error) {
      return { status: 400, message: error };
    }
  }

  //menghapus data yang pada order menu berdasarkan id yang di pilih
  async remove(orme_id: number): Promise<any> {
    try {
      const result = await order_menus.destroy({ where: { orme_id } });
      if (!result) {
        return { status: 400, message: `Data id ${orme_id} tidak di temukan` };
      } else {
        return { status: 200, message: `Data id ${orme_id} berhasil di hapus` };
      }
    } catch (error) {
      return { status: 400, message: error };
    }
  }
}
