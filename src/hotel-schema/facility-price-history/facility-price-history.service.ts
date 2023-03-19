import { Injectable } from '@nestjs/common';
import { CreateFacilityPriceHistoryDto } from './dto/create-facility-price-history.dto';
import { UpdateFacilityPriceHistoryDto } from './dto/update-facility-price-history.dto';

@Injectable()
export class FacilityPriceHistoryService {
  create(createFacilityPriceHistoryDto: CreateFacilityPriceHistoryDto) {
    return 'This action adds a new facilityPriceHistory';
  }

  findAll() {
    return `This action returns all facilityPriceHistory`;
  }

  findOne(id: number) {
    return `This action returns a #${id} facilityPriceHistory`;
  }

  update(id: number, updateFacilityPriceHistoryDto: UpdateFacilityPriceHistoryDto) {
    return `This action updates a #${id} facilityPriceHistory`;
  }

  remove(id: number) {
    return `This action removes a #${id} facilityPriceHistory`;
  }
}
