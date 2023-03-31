import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { hotels } from 'models/hotelSchema';
import { address } from 'models/masterSchema';
import { QueryTypes } from 'sequelize';
import { SearchAddress } from './dto/search-address.dto';

@Injectable()
export class HotelsService {
  async create(createHotelDto: CreateHotelDto) {
    return await hotels.create(createHotelDto);
  }

  async findAll() {
    try {
      const result = await hotels.findAll();
      return {
        data: result,
        message: 'success',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async getHotelsPagination(offset: number, hotelname: string) {
    try {
      const page_size = 10;
      const totalHotels = (await this.findAll()).data.length;
      const hotel = await hotels.sequelize.query(
        `SELECT * FROM hotel.pagination(:page, :page_size, :search_text);`,
        {
          replacements: {
            page: offset,
            page_size,
            search_text: hotelname.length > 0 ? hotelname : '',
          },
          type: QueryTypes.SELECT,
          model: hotels,
        },
      );

      if (hotel.length <= 0) {
        return {
          data: [
            {
              row_number: '',
              hotel_id: '',
              hotel_name: '',
              hotel_description: '',
              hotel_rating_star: null,
              status: '',
              hotel_modified_date: '',
              hotel_phonenumber: '',
              hotel_addr_id: '',
              reason: null,
              total_rows: '',
            },
          ],
          message: 'hotel tidak ditemukan',
          status: 400,
        };
      }

      return {
        data: hotel,
        message: 'berhasil ambil data',
        // totalPagination:,
        page_size,
        status: 200,
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async address(p_addr_line: SearchAddress) {
    try {
      const hotel = await hotels.sequelize.query(
        `SELECT * FROM master.search_address(:p_addr_line);`,
        {
          replacements: {
            p_addr_line: p_addr_line,
          },
          type: QueryTypes.SELECT,
          model: hotels,
        },
      );

      if (hotel.length < 1) {
        return {
          data: [
            {
              addr_id: '',
              full_address: '',
            },
          ],
          status: 400,
        };
      }
      return {
        data: hotel,
        status: 200,
      };
    } catch (error) {
      throw new HttpException(
        { messsage: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async addressInfo(pAddrLine: number) {
    try {
      const result = await hotels.sequelize.query(
        `SELECT * FROM master.search_address_by_id(:pAddrLine)`,
        {
          replacements: { pAddrLine },
          type: QueryTypes.SELECT,
          model: hotels,
        },
      );
      if (result.length < 1) {
        return {
          data: [
            {
              addr_id: '',
              full_address: '',
            },
          ],
          status: 400,
        };
      }
      return {
        data: result,
        status: 200,
      };
    } catch (error) {
      throw new HttpException(
        { message: error.message },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(hotel_id: number) {
    try {
      const result = await hotels.findOne({
        where: { hotel_id },
      });
      if (!result) {
        throw new HttpException(
          'hotel tidak ditemukan',
          HttpStatus.BAD_REQUEST,
        );
      }
      return result;
    } catch (error) {
      if (error.status == 400) {
        throw new HttpException(
          'hotel tidak ditemukan',
          HttpStatus.BAD_REQUEST,
        );
      }
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, updateHotelDto: UpdateHotelDto) {
    try {
      const hotel = await this.findOne(id);
      hotel.update(updateHotelDto);
      return {
        message: 'Update Hotel Berhasil',
      };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.findOne(id);

      await result.destroy();
      return `This action removes a #${id} hotel`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
