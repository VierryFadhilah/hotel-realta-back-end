import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { resto_menu_photos, resto_menus } from 'models/Resto/restoSchema';
import { Op } from 'sequelize';
import { CreateRestoMenuDto } from './dto/create-resto_menu.dto';
import { UpdateRestoMenuDto } from './dto/update-resto_menu.dto';
import { join } from 'path';
import * as fs from 'fs';

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
      return {
        status: 200,
        message: `Data berhasil ditambahkan`,
        data: restoMenus,
      };
    } catch (error) {
      return { status: 400, message: error };
    }
  }

  async findAllInclude(): Promise<any> {
    try {
      const result = await resto_menus.findAll({
        // where: {
        //   reme_name: {
        //     [Op.iLike]: `%${reme_name}%`,
        //   },
        // },
        include: [
          {
            model: resto_menu_photos,
            // attributes: ['remp_photo_filename'],
          },
        ],
      });
      // if (result) {
      return {
        status: 200,
        message: `Data  berhasil ditemukan`,
        data: result,
      };
      // } else {
      // return {
      //   status: 400,
      //   message: `Data dengan id ${reme_name} tidak ditemukan`,
      // };
      // }
    } catch (error) {
      return { status: 400, message: error };
    }
  }

  //menampilkan data yang di cari pada resto_menu berdasarkan name
  async findAndSearch(
    reme_name: string,
    page: number,
    entry: number,
  ): Promise<any> {
    try {
      console.log(page);
      const pages = page || 0;
      const limits = entry || 10;
      const searchh = reme_name || '';
      const offset = limits * (pages - 1);
      const totalRows = await this.restoMenusModel.count({
        where: {
          [Op.or]: [
            {
              reme_name: {
                [Op.iLike]: '%' + searchh + '%',
              },
            },
          ],
        },
      });
      const totalPage = Math.ceil(totalRows / limits);
      const result = await this.restoMenusModel.findAll({
        where: {
          reme_name: {
            [Op.iLike]: '%' + searchh + '%',
          },
        },
        include: [
          {
            model: resto_menu_photos,
            // attributes: ['remp_id', 'remp_photo_filename'],
          },
        ],
        offset: offset,
        limit: entry,
        order: [['reme_id', 'ASC']],
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
      return { status: 400, message: error };
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
        return { status: 400, message: `Data id ${reme_id} tidak di temukan` };
      }
      const result = await resto_menus.update(updateRestoMenuDto, {
        where: { reme_id },
        returning: true,
      });
      return {
        status: 200,
        message: `Data pada id ${reme_id} berhasil di perbarui`,
        data: result[1],
      }; // [1]untuk menghilangkan nomer data: pada postman
    } catch (error) {
      return { status: 400, message: error };
    }
  }

  //menghapus data yang pada resto_menu dan foto berdasarkan id yang di pilih
  async remove(reme_id: number): Promise<any> {
    try {
      const restoMenu = await resto_menus.findOne({
        where: { reme_id },
        include: [resto_menu_photos],
      });

      if (!restoMenu) {
        return { status: 400, message: `Data id ${reme_id} tidak ditemukan` };
      }

      // hapus foto jika ada
      if (restoMenu.resto_menu_photos.length) {
        for (const photo of restoMenu.resto_menu_photos) {
          const imageUrl = photo.remp_photo_filename;
          const imagefilename = imageUrl.split('/').pop();
          const imagePath = join(
            __dirname,
            '../../../../uploads/image/resto/',
            imagefilename,
          );
          console.log(imagePath);
          if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
          }
          await resto_menu_photos.destroy({
            where: { remp_id: photo.remp_id },
          });
        }
      }

      // hapus menu
      await resto_menus.destroy({ where: { reme_id } });

      return {
        status: 200,
        message: `Data id ${reme_id} berhasil dihapus`,
        data: restoMenu,
      };
    } catch (error) {
      return { status: 400, message: error };
    }
  }
}
