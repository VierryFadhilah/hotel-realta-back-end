import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FacilitiesService } from './facilities.service';
import { CreateFacilityDto } from './dto/create-facility.dto';
import { UpdateFacilityDto } from './dto/update-facility.dto';

@Controller('facilities')
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @Post()
  create(@Body() createFacilityDto: CreateFacilityDto) {
    return this.facilitiesService.create(createFacilityDto);
  }

  @Get()
  findAll() {
    return this.facilitiesService.findAll();
  }

  @Get('/byhotel/:hotel_id')
  findHotelFaci(@Param('hotel_id') hotel_id: string) {
    return this.facilitiesService.findHotelFaci(+hotel_id);
  }

  @Get('/pagination/:hotel_id/:offset/')
  getUsersPagination(
    @Param('hotel_id', ParseIntPipe) hotel_id: number,
    @Param('offset', ParseIntPipe) offset: number,
  ) {
    return this.facilitiesService.getFacilitiesPagination(hotel_id, offset);
  }

  @Get('/pagination/:hotel_id/:offset/:faciname')
  getUsersPaginationByHotelName(
    @Param('hotel_id', ParseIntPipe) hotel_id: number,
    @Param('offset', ParseIntPipe) offset: number,
    @Param('faciname') faciname: string,
  ) {
    return this.facilitiesService.getFacilitiesPagination(
      hotel_id,
      offset,
      faciname,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilitiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFacilityDto: UpdateFacilityDto,
  ) {
    return this.facilitiesService.update(+id, updateFacilityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilitiesService.remove(+id);
  }
}
