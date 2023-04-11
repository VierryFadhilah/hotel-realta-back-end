import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HotelBookingService } from './hotel-booking.service';
import { CreateHotelBookingDto } from './dto/create-hotel-booking.dto';
import { UpdateHotelBookingDto } from './dto/update-hotel-booking.dto';

@Controller('hotel-booking')
export class HotelBookingController {
  constructor(private readonly hotelBookingService: HotelBookingService) {}

  @Post()
  create(@Body() createHotelBookingDto: CreateHotelBookingDto) {
    return this.hotelBookingService.create(createHotelBookingDto);
  }

  @Get()
  findAll() {
    return this.hotelBookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hotelBookingService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHotelBookingDto: UpdateHotelBookingDto,
  ) {
    return this.hotelBookingService.update(+id, updateHotelBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hotelBookingService.remove(+id);
  }
}
