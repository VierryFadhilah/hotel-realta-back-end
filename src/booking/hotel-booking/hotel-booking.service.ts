import { Injectable } from '@nestjs/common';
import { CreateHotelBookingDto } from './dto/create-hotel-booking.dto';
import { UpdateHotelBookingDto } from './dto/update-hotel-booking.dto';
import { facilities, hotels } from 'models/hotelSchema';

@Injectable()
export class HotelBookingService {
  async create(createHotelBookingDto: any) {
    return await hotels.findAll();
  }

  async findAll() {
    return await hotels.findAll({
      include: {
        model: facilities,
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} hotelBooking`;
  }

  update(id: number, updateHotelBookingDto: UpdateHotelBookingDto) {
    return `This action updates a #${id} hotelBooking`;
  }

  remove(id: number) {
    return `This action removes a #${id} hotelBooking`;
  }
}
