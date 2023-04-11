import { Module } from '@nestjs/common';
import { HotelBookingService } from './hotel-booking.service';
import { HotelBookingController } from './hotel-booking.controller';

@Module({
  controllers: [HotelBookingController],
  providers: [HotelBookingService]
})
export class HotelBookingModule {}
