import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { facilities } from 'models/hotel_module';
import { FacilityPriceHistoryService } from '../facility-price-history/facility-price-history.service';

@Injectable()
export class FacilitiesService {
  constructor(
    private readonly facilityPriceHistoryService: FacilityPriceHistoryService,
  ) {}

  async create(createFacilityDto: CreateFacilityDto) {
    try {
      const facilitiesData = await facilities.create(createFacilityDto);
      // let faphFilter = Object.keys(createFacilityDto).reduce((obj, key) => {
      //   const newKey = key.replace('faci', 'faph');
      //   console.log(`Key: ${key}, New Key: ${newKey}`);
      //   obj[newKey] = facilitiesData[key];
      //   return obj;
      // }, {});

      // faphFilter = {
      //   ...faphFilter,
      //   faph_faci_id: facilitiesData.faci_id,
      // };
      // const facilityPriceHistoryData =
      //   await this.facilityPriceHistoryService.create(faphFilter);
      return { facilitiesData };
    } catch (error) {
      console.log(error);
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll() {
    try {
      return await facilities.findAll();
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(faci_id: number) {
    try {
      const result = await facilities.findOne({
        where: { faci_id },
      });

      if (!result) {
        throw new HttpException(
          'facilities tidak ditemukan',
          HttpStatus.BAD_REQUEST,
        );
      }
      return result;
    } catch (error) {
      if (error.status == 400) {
        throw new HttpException(
          'facilities tidak ditemukan',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateFacilityDto: UpdateFacilityDto) {
    console.log(updateFacilityDto);
    try {
      const result = await this.findOne(id);
      const facilitiesData: any = await result.update(updateFacilityDto);

      const excludedKeys = [
        'faci_faci_id',
        'faci_tax_rate',
        'faci_discount',
        'faci_rate_price',
        'faci_high_price',
        'faci_low_price',
        'faci_enddate',
        'faci_startdate',
      ]; // daftar key yang ingin dikecualikan
      let faphFilter: any = Object.keys(
        facilitiesData._previousDataValues,
      ).reduce((obj, key) => {
        if (excludedKeys.includes(key)) {
          // jika key tidak ada dalam daftar excludedKeys
          const newKey = key.replace('faci', 'faph');
          obj[newKey] = facilitiesData[key];
        }
        return obj;
      }, {});

      faphFilter = {
        ...faphFilter,
        faph_faci_id: id,
        faph_user_id: updateFacilityDto.faph_user_id,
      };
      let facilityPriceHistoryData: {};
      if (
        updateFacilityDto.faci_low_price ||
        updateFacilityDto.faci_high_price ||
        updateFacilityDto.faci_rate_price ||
        updateFacilityDto.faci_discount ||
        updateFacilityDto.faci_tax_rate
      ) {
        facilityPriceHistoryData =
          await this.facilityPriceHistoryService.create(faphFilter);
      }

      return { facilitiesData, facilityPriceHistoryData, faphFilter };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const facilities = await this.findOne(id);
      await facilities.destroy();
      return `This action removes a #${id} facility`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
