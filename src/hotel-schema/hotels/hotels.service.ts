import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateHotelDto } from './dto/create-hotel.dto';
import { UpdateHotelDto } from './dto/update-hotel.dto';
import { hotels } from 'models/hotelSchema';

@Injectable()
export class HotelsService {
  async create(createHotelDto: CreateHotelDto) {
    return await hotels.create(createHotelDto);
  }

  async findAll() {
    return await hotels.findAll();
  }

  async findOne(hotel_id: number) {
    console.log(hotel_id);
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
      return hotel.update(updateHotelDto);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: number) {
    try {
      const result = await this.findOne(id);
      result.destroy();
      return `This action removes a #${id} hotel`;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
