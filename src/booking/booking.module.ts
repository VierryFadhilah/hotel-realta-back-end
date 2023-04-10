import { Module } from '@nestjs/common';
import { HotelBookingModule } from './hotel-booking/hotel-booking.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { hotels } from 'models/hotelSchema';

@Module({
  imports: [SequelizeModule.forFeature([hotels]), HotelBookingModule],
})
export class BookingModule {}
