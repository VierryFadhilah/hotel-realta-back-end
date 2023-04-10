import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  NotFoundException,
  Query,
} from '@nestjs/common';
import { VendorService } from './vendor.service';
import { CreateVendorDto } from './dto/create-vendor.dto';

@Controller('purchasing')
export class VendorController {
  constructor(private readonly vendorService: VendorService) {}

  @Post('vendor')
  create(@Body() createVendorDto: CreateVendorDto) {
    return this.vendorService.create(createVendorDto);
  }

  @Get('vendorAll')
  findAll() {
    return this.vendorService.getAll();
  }

  @Get('vendor')
  async getVendorPages(
    @Query('search') search: string,
    @Query('searchPri') searchPri: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.vendorService.getPages(page, limit, search, searchPri);
  }

  @Get('listOrder')
  async getListOrder(
    @Query('search') search: string,
    @Query('searchStat') searchStat: string,
    @Query('page') page: number,
    @Query('limit') limit: number,
  ) {
    return this.vendorService.listOrder(page, limit, search, searchStat);
  }

  @Get('vendor/:vendor_name')
  findOne(@Param('vendor_name') vendor_name: string) {
    return this.vendorService.findOne(vendor_name);
  }

  @Get('vendor/search/:name')
  async findByVendorName(@Param('name') name: string) {
    const result = await this.vendorService.findByVendorName(name);
    if (!result) {
      throw new NotFoundException(`Vendor with name '${name}' not found`);
    }
    return result;
  }

  @Put('vendor/:id')
  update(@Param('id') id: string, @Body() updateVendorDto: CreateVendorDto) {
    return this.vendorService.update(+id, updateVendorDto);
  }

  @Delete('vendor/:id')
  remove(@Param('id') id: string) {
    return this.vendorService.remove(+id);
  }
}
