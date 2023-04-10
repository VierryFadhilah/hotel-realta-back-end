import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateFacilityPriceHistoryDto } from './dto/create-facility-price-history.dto';
import { UpdateFacilityPriceHistoryDto } from './dto/update-facility-price-history.dto';
import { InjectModel } from '@nestjs/sequelize';
import { facility_price_history } from 'models/hotelSchema';
import { QueryTypes } from 'sequelize';

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

  async getFacilitiesPagination(
    faci_ident: number,
    offset: number,
  ): Promise<{}>;
  async getFacilitiesPagination(
    faci_ident: number,
    offset: number,
    ord_by: string,
  ): Promise<{}>;
  async getFacilitiesPagination(
    faci_ident: number,
    offset: number,
    ord_by?: string,
  ) {
    try {
      const page_size = 10;
      let facility: {}[];

      if (ord_by) {
        const theFacility = await facility_price_history.sequelize.query(
          `SELECT * FROM hotel.facility_history_pagination(:faci_ident,:page, :page_size, :ord_by);`,
          {
            replacements: {
              faci_ident,
              page: offset,
              page_size,
              ord_by,
            },
            type: QueryTypes.SELECT,
            model: facility_price_history,
          },
        );

        facility = theFacility;
      } else {
        const theFacility = await facility_price_history.sequelize.query(
          `SELECT * FROM hotel.facility_history_pagination(:faci_ident, :page, :page_size);`,
          {
            replacements: {
              faci_ident,
              page: offset,
              page_size,
            },
            type: QueryTypes.SELECT,
            model: facility_price_history,
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
