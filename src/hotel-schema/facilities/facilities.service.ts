import { Injectable } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { facilities } from 'models/hotel_module';

@Injectable()
export class FacilitiesService {
  async create(createFacilityDto: CreateFacilityDto) {
    return await facilities.create(createFacilityDto);
  }

  async findAll() {
    return await facilities.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} facility`;
  }

  update(id: number, updateFacilityDto: UpdateFacilityDto) {
    return `This action updates a #${id} facility`;
  }

  remove(id: number) {
    return `This action removes a #${id} facility`;
  }
}
