import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFacilityPriceHistoryDto } from './dto/create-facility-price-history.dto';
import { UpdateFacilityPriceHistoryDto } from './dto/update-facility-price-history.dto';
import { InjectModel } from '@nestjs/sequelize';
import { facility_price_history } from 'models/hotelSchema';

@Injectable()
export class FacilityPriceHistoryService {
  constructor(
    @InjectModel(facility_price_history)
    private facilityPriceHistoryModel: typeof facility_price_history,
  ) {}

  async create(createFacilityPriceHistoryDto: CreateFacilityPriceHistoryDto) {
    try {
      return await facility_price_history.create(createFacilityPriceHistoryDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await facility_price_history.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(faph_id: number) {
    try {
      const result = await facility_price_history.findOne({
        where: { faph_id },
      });
      if (!result) {
        throw new HttpException(
          'facility price history tidak ditemukan',
          HttpStatus.BAD_REQUEST,
        );
      }
      return result;
    } catch (error) {
      if (error.status == 400) {
        throw new HttpException(
          'facility price history tidak ditemukan',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(
    id: number,
    updateFacilityPriceHistoryDto: UpdateFacilityPriceHistoryDto,
  ) {
    try {
      const faph = await this.findOne(id);
      faph.update(updateFacilityPriceHistoryDto);
      return faph;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.findOne(id);

      result.destroy();
      return `delete a #${id} from facilityPriceHistory`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
