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
import { FacilityPriceHistoryService } from './facility-price-history.service';
import { CreateFacilityPriceHistoryDto } from './dto/create-facility-price-history.dto';
import { UpdateFacilityPriceHistoryDto } from './dto/update-facility-price-history.dto';

@Controller('facility-price-history')
export class FacilityPriceHistoryController {
  constructor(
    private readonly facilityPriceHistoryService: FacilityPriceHistoryService,
  ) {}

  @Post()
  create(@Body() createFacilityPriceHistoryDto: CreateFacilityPriceHistoryDto) {
    return this.facilityPriceHistoryService.create(
      createFacilityPriceHistoryDto,
    );
  }

  @Get()
  findAll() {
    return this.facilityPriceHistoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilityPriceHistoryService.findOne(+id);
  }

  @Get('/pagination/:faci_id/:offset/')
  getUsersPagination(
    @Param('faci_id', ParseIntPipe) faci_id: number,
    @Param('offset', ParseIntPipe) offset: number,
  ) {
    return this.facilityPriceHistoryService.getFacilitiesPagination(
      faci_id,
      offset,
    );
  }

  @Get('/pagination/:faci_id/:offset/:order_by')
  getUsersPaginationByHotelName(
    @Param('faci_id', ParseIntPipe) faci_id: number,
    @Param('offset', ParseIntPipe) offset: number,
    @Param('order_by') order_by: string,
  ) {
    console.log(order_by);
    return this.facilityPriceHistoryService.getFacilitiesPagination(
      faci_id,
      offset,
      order_by,
    );
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateFacilityPriceHistoryDto: UpdateFacilityPriceHistoryDto,
  ) {
    return this.facilityPriceHistoryService.update(
      +id,
      updateFacilityPriceHistoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.facilityPriceHistoryService.remove(+id);
  }
}
