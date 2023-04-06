import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateFacilityPhotoDto } from './dto/create-facility-photo.dto';
import { UpdateFacilityPhotoDto } from './dto/update-facility-photo.dto';
import { facility_photos } from 'models/hotelSchema';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FacilityPhotosService {
  async create(createFacilityPhotoDto: CreateFacilityPhotoDto) {
    try {
      await facility_photos.create(createFacilityPhotoDto);
      return {
        message: 'berhasil mengupload gambar!',
      };
    } catch (error) {
      if (createFacilityPhotoDto.fapho_photo_filename) {
        this.deleteImgInFile(createFacilityPhotoDto.fapho_photo_filename);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getImage(filename: string, res: any) {
    try {
      const imagePath = path.join(
        process.cwd(),
        `${process.env.UPLOAD_PATH}`,
        filename,
      );
      if (!fs.existsSync(imagePath)) {
        console.log(imagePath);
      }
      res.sendFile(imagePath);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await facility_photos.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(fapho_id: number) {
    try {
      const photo = await facility_photos.findOne({
        where: { fapho_id },
      });
      if (!photo) {
        throw new HttpException(
          'photo tidak ditemukan',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return photo;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  deleteImgInFile(photoFilename) {
    const imagePath = path.join(
      __dirname,
      `../../../../${process.env.UPLOAD_PATH}`,
      photoFilename,
    );

    fs.unlink(imagePath, (error) => {
      if (error) {
        throw new HttpException(
          error.message,
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      console.log('File successfully delete/update');
    });
  }

  async update(id: number, updateFacilityPhotoDto: UpdateFacilityPhotoDto) {
    try {
      const photo = await this.findOne(id);
      await photo.update(updateFacilityPhotoDto);
      if (updateFacilityPhotoDto.fapho_photo_filename) {
        this.deleteImgInFile(photo.fapho_photo_filename);
      }
      return photo;
    } catch (error) {
      if (updateFacilityPhotoDto.fapho_photo_filename) {
        this.deleteImgInFile(updateFacilityPhotoDto.fapho_photo_filename);
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const photo = await this.findOne(id);

      this.deleteImgInFile(photo.fapho_photo_filename);

      photo.destroy();

      return `This action removes a #${id} facilityPhoto`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
