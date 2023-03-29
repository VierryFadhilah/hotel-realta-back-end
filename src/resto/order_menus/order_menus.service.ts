import { Injectable } from '@nestjs/common';
import { CreateOrderMenuDto } from './dto/create-order_menu.dto';
import { UpdateOrderMenuDto } from './dto/update-order_menu.dto';
import { order_menus } from 'models/restoSchema';

@Injectable()
export class OrderMenusService {
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
      return { message: `Data berhasil ditambahkan`, data: result };
    } catch (error) {
      return error;
    }
  }

  //menampilkan semua data order menu
  async findAll(): Promise<any> {
    try {
      const result = await order_menus.findAll();
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

  //menampilkan data yang pada order menu berdasarkan id yang di pilih
  async findOne(orme_id: number): Promise<any> {
    try {
      const result = await order_menus.findOne({ where: { orme_id } });
      if (result) {
        return {
          message: `Order menu detail dengan id ${orme_id} di temukan`,
          data: result,
        };
      } else {
        return {
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
        return `Data id ${orme_id} tidak ditemukan`;
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
        message: `Data pada id ${orme_id} telah diperbarui`,
        data: orderMenuDetail,
      };
    } catch (error) {
      return error;
    }
  }

  //menghapus data yang pada order menu berdasarkan id yang di pilih
  async remove(orme_id: number): Promise<any> {
    try {
      const result = await order_menus.destroy({ where: { orme_id } });
      if (!result) {
        return `Data id ${orme_id} tidak di temukan`;
      } else {
        return `Data id ${orme_id} berhasil di hapus`;
      }
    } catch (error) {
      return error;
    }
  }
}
