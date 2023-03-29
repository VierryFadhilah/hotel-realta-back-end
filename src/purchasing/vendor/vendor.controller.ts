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

  // @Get('vendor')
  // findAll() {
  //   return this.vendorService.findAll();
  // }
  @Get('vendor')
  async findAll(@Query('page') page = 1, @Query('limit') limit = 5) {
    return this.vendorService.findAll(page, limit);
  }

  @Get('listOrder')
  async getAll(
    @Query('page') page = 1,
    @Query('limit') limit = 5,
  ): Promise<any[]> {
    const result = await this.vendorService.listOrder(page, limit);
    return result;
  }

  @Get('vendor/:id')
  findOne(@Param('id') id: string) {
    return this.vendorService.findOne(+id);
  }

  @Get('vendor/name/:name')
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
