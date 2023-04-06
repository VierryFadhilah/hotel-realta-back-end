import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStockPhotoDto } from './dto/create-stock_photo.dto';
import { stock_photo } from 'models/purchasingSchema';
import * as fs from 'fs';
import { basename, join } from 'path';

@Injectable()
export class StockPhotoService {
  // async create(
  //   file: Express.Multer.File,
  //   createStockPhotoDto: CreateStockPhotoDto,
  // ): Promise<any> {
  //   const { originalname, buffer } = file;
  //   const uniqueSuffix = Math.round(Math.random() * 1e9);
  //   const fileName = `${uniqueSuffix}-${originalname}`;
  //   const filePath = `./uploads/${fileName}`;
  //   fs.writeFileSync(filePath, buffer);
  //   try {
  //     const finalImageUrl = '/purchasing/stock-photo/image/' + fileName;
  //     const result = stock_photo.create({
  //       spho_thumbnail_filename: createStockPhotoDto.spho_thumbnail_filename,
  //       spho_photo_filename: createStockPhotoDto.spho_photo_filename,
  //       spho_primary: createStockPhotoDto.spho_primary,
  //       spho_url: finalImageUrl,
  //       spho_stock_id: createStockPhotoDto.spho_stock_id,
  //     });
  //     return result;
  //   } catch (err) {
  //     return err;
  //   }
  // }
  async create(
    files: Express.Multer.File[],
    createStockPhotoDto: CreateStockPhotoDto,
  ): Promise<any> {
    const imageUrls = [];
    await Promise.all(
      files.map(async (file) => {
        const { originalname, buffer } = file;
        const uniqueSuffix = Math.round(Math.random() * 1e9);
        const fileName = `${uniqueSuffix}-${originalname}`;
        const filePath = `./uploads/image/purchasing/${fileName}`;
        fs.writeFileSync(filePath, buffer);
        const finalImageUrl = '/purchasing/stock-photo/image/' + fileName;
        imageUrls.push(finalImageUrl);
      }),
    );
    try {
      const result = stock_photo.create({
        spho_thumbnail_filename: createStockPhotoDto.spho_thumbnail_filename,
        spho_photo_filename: createStockPhotoDto.spho_photo_filename,
        spho_primary: createStockPhotoDto.spho_primary,
        spho_url: imageUrls.join(','),
        spho_stock_id: createStockPhotoDto.spho_stock_id,
      });
      return {
        statusCode: 200,
        message: 'Success',
        data: result,
      };
    } catch (err) {
      return err;
    }
  }

  async findAll(page: number, limit: number) {
    const offset = (page - 1) * limit;
    const result = await stock_photo.findAndCountAll({
      order: [['spho_id', 'ASC']],
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
    const result = await stock_photo.findByPk(id);
    return {
      statusCode: 200,
      message: 'Success',
      data: result,
    };
  }

  // async update(
  //   file: Express.Multer.File,
  //   createStockPhotoDto: CreateStockPhotoDto,
  //   id: any,
  // ) {
  //   try {
  //     const photo = await stock_photo.findOne({ where: { spho_id: id } });
  //     if (!photo) {
  //       return 'File tidak tersedia';
  //     }
  //     let finalImageUrl = photo.spho_url;
  //     if (file) {
  //       const { originalname, buffer } = file;
  //       const uniqueSuffix = Math.round(Math.random() * 1e9);
  //       const fileName = `${uniqueSuffix}-${originalname}`;
  //       const filePath = `./uploads/${fileName}`;
  //       fs.writeFileSync(filePath, buffer);

  //       finalImageUrl =
  //         // req.protocol + '://' + req.get('host') +
  //         '/product/image/' + fileName;
  //       console.log(finalImageUrl);
  //       const oldImagePath = './uploads/' + basename(photo.spho_url);
  //       if (fs.existsSync(oldImagePath)) {
  //         fs.unlinkSync(oldImagePath);
  //       }
  //     }
  //     const result = await photo.update({
  //       spho_thumbnail_filename: createStockPhotoDto.spho_thumbnail_filename,
  //       spho_photo_filename: createStockPhotoDto.spho_photo_filename,
  //       spho_primary: createStockPhotoDto.spho_primary,
  //       spho_url: finalImageUrl,
  //       spho_stock_id: createStockPhotoDto.spho_stock_id,
  //     });
  //     return result;
  //   } catch (err) {
  //     throw err;
  //   }
  // }
  async updateMultiple(
    files: Express.Multer.File[],
    createStockPhotoDto: CreateStockPhotoDto,
    id: any,
  ) {
    try {
      const photo = await stock_photo.findOne({ where: { spho_id: id } });
      if (!photo) {
        return 'File tidak tersedia';
      }
      const imageUrls = [];
      if (files) {
        const oldImagePaths = photo.spho_url.split(',');
        await Promise.all(
          files.map(async (file, index) => {
            const { originalname, buffer } = file;
            const uniqueSuffix = Math.round(Math.random() * 1e9);
            const fileName = `${uniqueSuffix}-${originalname}`;
            const filePath = `./uploads/image/purchasing/${fileName}`;
            fs.writeFileSync(filePath, buffer);
            const finalImageUrl = '/purchasing/stock-photo/image/' + fileName;
            imageUrls.push(finalImageUrl);
            const oldImagePath =
              './uploads/image/purchasing/' + basename(oldImagePaths[index]);
            if (fs.existsSync(oldImagePath)) {
              fs.unlinkSync(oldImagePath);
              return {
                message: 'Berhasil mengupdate foto stock',
                data: result,
              };
            }
          }),
        );
        // Remove any remaining images from the old image array
        oldImagePaths.slice(files.length).forEach((oldImagePath) => {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        });
      } else {
        // Delete all old images if no new images are provided
        photo.spho_url.split(',').forEach((oldImagePath) => {
          if (fs.existsSync(oldImagePath)) {
            fs.unlinkSync(oldImagePath);
          }
        });
      }
      const result = await photo.update({
        spho_thumbnail_filename: createStockPhotoDto.spho_thumbnail_filename,
        spho_photo_filename: createStockPhotoDto.spho_photo_filename,
        spho_primary: createStockPhotoDto.spho_primary,
        spho_url: imageUrls.join(','),
        spho_stock_id: createStockPhotoDto.spho_stock_id,
      });
      return result;
    } catch (err) {
      throw err;
    }
  }

  // async remove(id: number) {
  //   try {
  //     const photo = await stock_photo.findOne({
  //       where: {
  //         spho_id: id,
  //       },
  //     });
  //     if (!photo) {
  //       return 'Photo tidak ditemukan';
  //     }
  //     const imageUrl = photo.spho_url;
  //     const imageFileName = imageUrl.split('/').pop();
  //     const imagePath = join(process.cwd(), 'uploads/' + imageFileName);
  //     console.log(imagePath);

  //     if (fs.existsSync(imagePath)) {
  //       fs.unlinkSync(imagePath);
  //       await stock_photo.destroy({
  //         where: {
  //           spho_id: id,
  //         },
  //       });
  //     }
  //     return `Photo dengan id-${id} telah terhapus`;
  //   } catch (err) {
  //     return err;
  //   }
  // }
  async remove(id: number): Promise<void> {
    const stockPhoto = await stock_photo.findByPk(id);
    if (!stockPhoto) {
      throw new NotFoundException(`Stock photo with id ${id} not found`);
    }
    // hapus file gambar dari server
    const imageUrls = stockPhoto.spho_url.split(',');
    imageUrls.forEach((imageUrl) => {
      const fileName = imageUrl.split('/').pop();
      const filePath = join(
        __dirname,
        '../../../../uploads/image/purchasing',
        fileName,
      );
      console.log(filePath);
      // const filePath = `./uploads/image/purchasing/${fileName}`;
      try {
        fs.unlinkSync(filePath);
      } catch (err) {
        console.log(`Failed to delete file ${filePath}`);
      }
    });
    // hapus data stock photo dari database
    await stock_photo.destroy({
      where: {
        spho_id: id,
      },
    });
  }
}
