import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';
import { facilities } from 'models/hotelSchema';
import { FacilityPriceHistoryService } from '../facility-price-history/facility-price-history.service';
import { QueryTypes } from 'sequelize';
import { CategoryGroupService } from 'src/master-schema/category_group/category_group.service';

@Injectable()
export class FacilitiesService {
  constructor(
    private readonly facilityPriceHistoryService: FacilityPriceHistoryService,
    private readonly categoryGroupService: CategoryGroupService,
  ) {}

  async create(createFacilityDto: CreateFacilityDto) {
    try {
      await facilities.create(createFacilityDto);
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
      return { message: 'Berhasil Menambahkan Facility', status: 201 };
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

  async findHotelFaci(faci_hotel_id: number) {
    try {
      const faci = await facilities.findAll({
        where: { faci_hotel_id },
      });

      if (!faci) {
        throw new HttpException(
          {
            message: 'hotel facilities not found',
            status: 400,
          },
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
      return {
        data: faci,
        status: 200,
      };
    } catch (error) {
      throw new HttpException(
        {
          message: error.message,
          status: 500,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFacilitiesPagination(
    hotel_ident: number,
    offset: number,
  ): Promise<{}>;
  async getFacilitiesPagination(
    hotel_ident: number,
    offset: number,
    facilityName: string,
  ): Promise<{}>;
  async getFacilitiesPagination(
    hotel_ident: number,
    offset: number,
    facilityName?: string,
  ) {
    try {
      const page_size = 10;
      let facility: {}[];

      if (facilityName) {
        const theFacility = await facilities.sequelize.query(
          `SELECT * FROM hotel.facilities_pagination(:hotel_ident,:page, :page_size, :search_text);`,
          {
            replacements: {
              hotel_ident,
              page: offset,
              page_size,
              search_text: facilityName,
            },
            type: QueryTypes.SELECT,
            model: facilities,
          },
        );

        facility = theFacility;
      } else {
        const theFacility = await facilities.sequelize.query(
          `SELECT * FROM hotel.facilities_pagination(:hotel_ident, :page, :page_size);`,
          {
            replacements: {
              hotel_ident,
              page: offset,
              page_size,
            },
            type: QueryTypes.SELECT,
            model: facilities,
          },
        );

        facility = theFacility;
      }

      if (facility.length <= 0) {
        return {
          data: [{}],
          message: 'facility tidak ditemukan',
          page_size,
          status: 400,
        };
      }

      return {
        data: facility,
        message: 'berhasil ambil data',
        // totalPagination:,
        page_size,
        status: 200,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        {
          message: error.message,
          status: 500,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      return { data: result, status: 200 };
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
      const result = (await this.findOne(id)).data;
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
        'faci_expose_price',
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
      // eslint-disable-next-line @typescript-eslint/ban-types

      await this.facilityPriceHistoryService.create(faphFilter);

      return {
        message: 'Update Faciliti Berhasil',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const facilities = (await this.findOne(id)).data;
      await facilities.destroy();
      return `This action removes a #${id} facility`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
