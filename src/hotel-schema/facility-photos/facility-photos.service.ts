import { Injectable } from '@nestjs/common';
import { CreateFacilityPhotoDto } from './dto/create-facility-photo.dto';
import { UpdateFacilityPhotoDto } from './dto/update-facility-photo.dto';

@Injectable()
export class FacilityPhotosService {
  create(createFacilityPhotoDto: CreateFacilityPhotoDto) {
    return 'This action adds a new facilityPhoto';
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
