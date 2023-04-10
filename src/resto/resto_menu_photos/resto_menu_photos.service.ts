import { Body, UploadedFile, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { resto_menu_photos, resto_menus } from 'models/Resto/restoSchema';
import { CreateRestoMenuPhotoDto } from './dto/create-resto_menu_photo.dto';
import { UpdateRestoMenuPhotoDto } from './dto/update-resto_menu_photo.dto';
import { join } from 'path';
import * as fs from 'fs';

@Injectable()
export class RestoMenuPhotosService {
  constructor(
    @InjectModel(resto_menu_photos)
    private photoModel: typeof resto_menu_photos,
  ) {}

  // untuk mengupload single file foto saja
  // async create(
  //   createRestoMenuPhotoDto: CreateRestoMenuPhotoDto,
  //   foto: Express.Multer.File,
  // ) {
  //   try {
  //     const photoMenu = await this.photoModel.create({
  //       remp_thumbnail_filename:
  //         createRestoMenuPhotoDto.remp_thumbnail_filename,
  //       remp_photo_filename: foto.filename,
  //       remp_primary: createRestoMenuPhotoDto.remp_primary,
  //       remp_url: `http://localhost:${process.env.PORT}/resto_menu_photos/uploads/image/resto/${foto.filename}`,
  //       remp_reme_id: createRestoMenuPhotoDto.remp_reme_id,
  //     });
  //     return { message: `Data berhasil ditambahkan`, data: photoMenu };
  //   } catch (error) {
  //     return error;
  //   }
  // }

  // untuk mengupload multiple file foto
  async create(
    createRestoMenuPhotoDto: CreateRestoMenuPhotoDto,
    foto: Express.Multer.File[],
  ) {
    try {
      const data = [];
      for (let i = 0; i < foto.length; i++) {
        const photoMenu = await this.photoModel.create({
          remp_thumbnail_filename:
            createRestoMenuPhotoDto.remp_thumbnail_filename,
          remp_photo_filename: foto[i].filename,
          remp_primary: createRestoMenuPhotoDto.remp_primary,
          remp_url: `http://localhost:${process.env.PORT}/resto-menu-photos/uploads/image/resto/${foto[i].filename}`,
          remp_reme_id: createRestoMenuPhotoDto.remp_reme_id,
        });
        data.push(photoMenu);
      }
      return { status: 200, message: `Data berhasil ditambahkan`, data };
    } catch (error) {
      return { status: 400, message: error };
    }
  }

  //untuk menampilakan semua data yang ada pada resto menu photos
  async findAll(): Promise<any> {
    try {
      const result = await resto_menu_photos.findAll({
        //   include: [
        //     {
        //       model: resto_menus,
        //       attributes: [
        //         'reme_faci_id',
        //         'reme_name',
        //         'reme_description',
        //         'reme_price',
        //         'reme_status',
        //       ],
        //     },
        //   ],
      });
      return { status: 200, message: `Data telah di temukan`, data: result };
    } catch (error) {
      return { status: 400, message: error };
    }
  }

  //untuk menampilakan data yang ada pada resto menu photos bedasarkan id
  async findOne(remp_id: number): Promise<any> {
    try {
      const result = await resto_menu_photos.findOne({ where: { remp_id } });
      if (result) {
        return {
          status: 200,
          message: `Data dengan id ${remp_id} berhasil ditemukan`,
          data: result,
        };
      } else {
        return {
          status: 400,
          message: `Data dengan id ${remp_id} tidak ditemukan`,
        };
      }
    } catch (error) {
      return { status: 400, message: error };
    }
  }

  //untuk mengedit data pada resto menu photos
  async update(
    remp_id: number,
    @Body() updateRestoMenuPhotoDto: UpdateRestoMenuPhotoDto,
    @UploadedFile() foto: Express.Multer.File,
  ) {
    try {
      const result = await resto_menu_photos.findOne({ where: { remp_id } });
      const imageUrl = result.remp_photo_filename;
      const imagefilename = imageUrl.split('/').pop();
      const imagePath = join(
        __dirname,
        '../../../../uploads/image/resto/',
        imagefilename, // menggunakan nama file yang baru
      );
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
      await this.photoModel.update(
        {
          remp_thumbnail_filename:
            updateRestoMenuPhotoDto.remp_thumbnail_filename,
          remp_photo_filename: foto.filename,
          remp_primary: updateRestoMenuPhotoDto.remp_primary,
          remp_url: `http://localhost:${process.env.PORT}/resto-menu-photos/uploads/image/resto/${foto.filename}`,
          remp_reme_id: updateRestoMenuPhotoDto.remp_reme_id,
        },
        { where: { remp_id } },
      );
      return {
        status: 200,
        message: `Data dengan remp_id ${remp_id} berhasil diupdate`,
      };
    } catch (error) {
      console.error(error);
      return {
        status: 400,
        message: `Data dengan remp_id ${remp_id} tidak di temukan`,
      };
    }
  }

  //untuk menghapus data yang ada pada resto menu photos berdasarkan id
  async remove(remp_id: number): Promise<any> {
    try {
      const result = await resto_menu_photos.findOne({ where: { remp_id } });
      if (!result) {
        return `Data dengan id ${remp_id} tidak ditemukan`;
      }
      const imageUrl = result.remp_photo_filename;
      const imagefilename = imageUrl.split('/').pop();
      const imagePath = join(
        __dirname,
        '../../../../uploads/image/resto/',
        imagefilename,
      );
      console.log(imagePath);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
        await resto_menu_photos.destroy({ where: { remp_id } });
      }
      return { status: 200, message: `Data dengan id ${remp_id} terhapus` };
    } catch (error) {
      return { status: 400, message: error };
    }
  }
}
