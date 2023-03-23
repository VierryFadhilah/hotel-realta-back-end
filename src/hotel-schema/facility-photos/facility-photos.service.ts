import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFacilityPhotoDto } from './dto/create-facility-photo.dto';
import { UpdateFacilityPhotoDto } from './dto/update-facility-photo.dto';
import { facility_photos } from 'models/hotel_module';

@Injectable()
export class FacilityPhotosService {
  async create(createFacilityPhotoDto: CreateFacilityPhotoDto) {
    try {
      return await facility_photos.create(createFacilityPhotoDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  findAll() {
    return `This action returns all facilityPhotos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} facilityPhoto`;
  }

  update(id: number, updateFacilityPhotoDto: UpdateFacilityPhotoDto) {
    return `This action updates a #${id} facilityPhoto`;
  }

  remove(id: number) {
    return `This action removes a #${id} facilityPhoto`;
  }
}
