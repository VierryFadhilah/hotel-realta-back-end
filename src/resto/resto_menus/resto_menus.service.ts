import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { resto_menus } from 'models/restoSchema';
import { Op } from 'sequelize';
import { CreateRestoMenuDto } from './dto/create-resto_menu.dto';
import { UpdateRestoMenuDto } from './dto/update-resto_menu.dto';

@Injectable()
export class RestoMenusService {
  constructor(
    @InjectModel(resto_menus)
    private readonly restoMenusModel: typeof resto_menus,
  ) {}

  //menambahkan data resto_menu
  async create(createRestoMenusDto: CreateRestoMenuDto): Promise<any> {
    try {
      const restoMenus = await resto_menus.create(createRestoMenusDto);
      return { message: `Data berhasil ditambahkan`, data: restoMenus };
    } catch (error) {
      return error;
    }
  }

  //menampilkan semua data pada resto_menu
  // async findAll(): Promise<any> {
  //   try {
  //     const result = await resto_menus.findAll();
  //     if (!result[0]) {
  //       //jika tidak ada data data =0(kosong) tampilan perintah dibawah ini
  //       return `Data tidak di temukan`;
  //     } else {
  //       return { message: `Data di temukan`, data: result };
  //     }
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // pagination dengan page dan limit yang sudah di tentukan
  async findAll(page: number, limit: number): Promise<any> {
    try {
      const offset = (page - 1) * limit;

      const result = await this.restoMenusModel.findAndCountAll({
        offset,
        limit,
      });

      const count = result.count;
      const totalPages = Math.ceil(count / limit);
      const currentPage = page;
      const data = result.rows;

      return {
        message: `Data berhasil ditemukan`,
        data,
        meta: {
          count,
          totalPages,
          currentPage,
          hasNextPage: currentPage < totalPages,
          hasPrevPage: currentPage > 1,
        },
      };
    } catch (error) {
      return error;
    }
  }

  //menampilkan data yang di cari pada resto_menu berdasarkan name
  async findOne(reme_name: string, page: number, entry: number): Promise<any> {
    try {
      const result = await this.restoMenusModel.findAndCountAll({
        where: {
          reme_name: {
            [Op.like]: `%${reme_name}%`, //[Op.like] adalah salah satu operator kueri Sequelize yang digunakan untuk mencari data. % digunakan untuk mencari nilai yang memiliki pola yang sama dengan yang dicari
          },
        },
        limit: entry,
        offset: (page - 1) * entry,
      });
      if (result.rows.length === 0) {
        return `Data ${reme_name} tidak ditemukan`;
      } else {
        const totalPages = Math.ceil(result.count / entry);
        return {
          message: `Data ${reme_name} berhasil ditemukan`,
          data: {
            result,
            page,
            entry,
            totalPages,
          },
        };
      }
    } catch (error) {
      return error;
    }
  }

  //mengedit data yang pada resto_menu berdasarkan id yang di pilih
  async update(
    reme_id: number,
    updateRestoMenuDto: UpdateRestoMenuDto,
  ): Promise<any> {
    try {
      const restoid = await resto_menus.findByPk(reme_id);
      if (!restoid) {
        return `Data id ${reme_id} tidak di temukan`;
      }
      const result = await resto_menus.update(updateRestoMenuDto, {
        where: { reme_id },
        returning: true,
      });
      return {
        message: `Data pada id ${reme_id} di perbarui`,
        data: result[1],
      }; // [1]untuk menghilangkan nomer data: pada postman
    } catch (error) {
      return error;
    }
  }

  //menghapus data yang pada resto_menu berdasarkan id yang di pilih
  async remove(reme_id: number): Promise<any> {
    try {
      const result = await resto_menus.destroy({ where: { reme_id } });
      if (!result) {
        return `Data id ${reme_id} tidak di temukan`;
      } else {
        return `Data id ${reme_id} berhasil di hapus`;
      }
    } catch (error) {
      return error;
    }
  }
}
